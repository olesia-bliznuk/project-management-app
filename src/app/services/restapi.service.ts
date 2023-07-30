import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { createUrlTreeFromSnapshot, Router } from '@angular/router';
import { OpenBoardService } from './open-board.service';
import { SwalService } from './swal.service';
import { user, board, task, column } from '../interfaces/interfaces';
// let jwt = require('jsonwebtoken');
const urlApi = 'https://final-task-backend-production-5bd7.up.railway.app';
// import { Buffer } from 'node:buffer';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  token!: string;
  currentLogin!: string | null;
  currentId!: string | null;
  expirationDate!: Date;
  allUsers!: user[];
  allBoards!: board[];
  allColumns!: column[];
  allBoardTasks!: task[];

  constructor(private http: HttpClient,
    private translateService: TranslateService,
    private router: Router,
    public openBoardService: OpenBoardService,
    private swalService: SwalService,
  ) {
  }

  public async httpRequests(url: string, data: any, type: string, textMsg: string = '', userInfo: boolean = false) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    try {
      switch (type) {
        case 'put':
          const dataResultPut = await this.http.put(url, data, { headers }).toPromise()
          if (textMsg) this.swalService.success(textMsg);
          if (userInfo) {
            this.currentLogin = data.login;
            localStorage.setItem("login", data.login);
          }
          break;
        case 'delete':
          const dataResultDelete = await this.http.delete(url, { headers }).toPromise();
          break;
        case 'post':
          const dataResultPost = await this.http.post(url, data, { headers }).toPromise();
          this.swalService.success(textMsg);
          break;
      }
    } catch (error: any) {
      if (error.status === 409)
        this.swalService.error(this.translateService.instant('error409'));
      else
        this.swalService.error(this.translateService.instant('error400'));
    }
  }

  public registration(userName: string, userLogin: string, userPassword: string): void {

    fetch(`${urlApi}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        login: userLogin,
        password: userPassword
      })
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 409)
            this.swalService.error(this.translateService.instant('error409'));
          else
            this.swalService.error(this.translateService.instant('error400'));
        } else {
          this.swalService.success(this.translateService.instant('registOk'));
          setTimeout(() => this.router.navigate(['login']), 1000);
        }
      })
      .catch(error => {
        this.swalService.error(`Error: ${error.message}`);
      });
  }

  public signIn(userLogin: string, userPassword: string): void {

    fetch(`${urlApi}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: userLogin,
        password: userPassword,
      })
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401)
            this.swalService.error(this.translateService.instant('error401'))
          else
            this.swalService.error(this.translateService.instant('error400'));
        }
        else {
          response.json().then(data => {
            this.token = data.token;
            this.router.navigate(['']);
            this.currentLogin = userLogin;
            localStorage.setItem('token', this.token);
          });
        }
      })
      .catch(error => {
        this.swalService.error(`Error: ${error.message}`);
      });
  }

  public autoSignIn(): void {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      let headerBase64, payloadBase64, signature;
      [headerBase64, payloadBase64, signature] = storedToken.split('.');
      const payLoad64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(
        atob(payLoad64).split('').map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
          .join('')
      ));
      const currentTime = Date.now() / 1000;
      if (payload.exp && payload.exp < currentTime) {
        localStorage.clear();
      } else {
        this.token = storedToken;
        this.currentLogin = payload.login;
        this.currentId = payload.id;
        this.getAllBoards();
      }
    }
  }

  public async getColumnsBoard(id: string | undefined) {
    try {
      const url = `${urlApi}/boards/${id}/columns`;
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const data = await this.http.get(url, { headers }).toPromise()
        .then(response => {
          this.allColumns = response as column[];
          this.getAllTasksInBoard();
        })

    } catch (error) {
      this.swalService.error(this.translateService.instant('error400'))
    }
  }

  public async getAllBoards() {
    try {
      const currentUserLogin = this.currentLogin;
      let url: string = '';
      if (currentUserLogin !== undefined) {
        url = `${urlApi}/boardsSet/${currentUserLogin}`;
      }
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const data = await this.http.get(url, { headers }).toPromise()
        .then(response => {
          this.allBoards = response as board[];
        })
    } catch (error) {
      this.swalService.error(this.translateService.instant('error400'));
    }
  }

  public deleteAutoSignIn(): void {
    this.token = "";
    localStorage.clear();
  }

  // public async getAllUsers() {

  //   const url = `${urlApi}/users`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   try {
  //     this.allUsers = await this.http.get(url, { headers }).toPromise() as user[];
  //   } catch (error) {
  //     Swal.fire(this.translateService.instant('error400'));
  //   }
  // }

  // public async getCurrentUser() {
  //   try {
  //     await this.getAllUsers();
  //     return this.allUsers.filter((value: user) => value.login === this.currentLogin)[0];
  //   } catch (error) {
  //     this.swalService.error(this.translateService.instant('error400'));
  //     return undefined;
  //   }
  // }

  public async getAllTasksInBoard() {
    try {
      const idBoard = this.openBoardService.getId();
      const url = `${urlApi}/tasksSet/${idBoard}`;
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const data = await this.http.get(url, { headers }).toPromise()
        .then(response => {
          this.allBoardTasks = response as task[];
        })
    } catch (error) {
      this.swalService.swalFire(this.translateService.instant('error400'));
    }
  }

  public async removeUser() {
    const url = `${urlApi}/users/${this.currentId}`;
    await this.httpRequests(url, [], 'delete');
    this.removeAllUsersBoards();
    this.deleteAutoSignIn();
    this.router.navigate(['']);
  }

  public async removeAllUsersBoards() {
    await this.allBoards.forEach((element: { _id: string; }) => this.deleteBoard(element._id))
  }

  public async changeBoard(id: string, title: string) {
    const url = `${urlApi}/boards/${id}`;
    const userData = {
      "title": title,
      "owner": this.currentLogin,
      "users": this.currentLogin
    };
    await this.httpRequests(url, userData, 'put');
    this.getAllBoards();
  }

  public async changeAllUsersBoards() {
    this.allBoards.forEach((element: { _id: string; title: string; }) => this.changeBoard(element._id, element.title))
  }

  public async changeUserInfo(userName: string, userLogin: string, userPassword: string) {
    // const currentUser = await this.getCurrentUser();
    // let url = '';
    // if (currentUser !== undefined)
    const url = `${urlApi}/users/${this.currentId}`;
    const userData = {
      name: userName,
      login: userLogin,
      password: userPassword
    };
    await this.httpRequests(url, userData, 'put', this.translateService.instant('changeInfoOk'), true);
    this.changeAllUsersBoards();
  }

  public createBoard(title: string) {
    const url = `${urlApi}/boards`;
    const userData = {
      "title": title,
      "owner": this.currentLogin,
      "users": this.currentLogin
    };
    this.httpRequests(url, userData, 'post', this.translateService.instant('successBoard'));
  }

  public async deleteBoard(id: string) {
    const url = `${urlApi}/boards/${id}`;
    await this.httpRequests(url, [], 'delete');
    this.allBoards = this.allBoards.filter((item: { _id: string; }) => item._id !== id);
  }

  public async createColumn(title: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns`;
    const columnData = {
      "title": title,
      "order": 0
    };
    await this.httpRequests(url, columnData, 'post', this.translateService.instant('successColumn'));
    this.getColumnsBoard(idBoard);
  }

  public async deleteColumn(idColumn: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns/${idColumn}`;
    await this.httpRequests(url, [], 'delete');
    this.getColumnsBoard(idBoard);
  }

  public async createTask(id: string, title: string, description: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns/${id}/tasks`;
    const taskData = {
      "title": title,
      "order": 0,
      "description": description,
      "userId": 0,
      "users": []
    };
    this.httpRequests(url, taskData, 'post', this.translateService.instant('successTask'))
    this.getColumnsBoard(idBoard);
  }

  public async deleteTask(ColumnId: string, TaskId: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns/${ColumnId}/tasks/${TaskId}`;
    this.httpRequests(url, [], 'delete');
    this.getColumnsBoard(idBoard);
  }

  public changeTask(idColumn: string, idTask: string, title: string, description: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns/${idColumn}/tasks/${idTask}`;
    const taskData = {
      "title": title,
      "order": 0,
      "description": description,
      "columnId": idColumn,
      "userId": 0,
      "users": []
    };
    this.httpRequests(url, taskData, 'put', this.translateService.instant('successTaskChange'));
    this.getColumnsBoard(idBoard);
  }

  public async changeTitleColumn(idColumn: string, title: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}/columns/${idColumn}`;
    const columnData = {
      "title": title,
      "order": 0
    }
    await this.httpRequests(url, columnData, 'put', this.translateService.instant('successColumnTitleChange'));
    await this.getColumnsBoard(idBoard);
  }

  public async changeTitleBoard(title: string) {
    const idBoard = this.openBoardService.getId();
    const url = `${urlApi}/boards/${idBoard}`;
    const BoardData = {
      "title": title,
      "owner": this.currentLogin,
      "users": [this.currentLogin]
    }
    await this.httpRequests(url, BoardData, 'put', this.translateService.instant('successTitleChange'));
  }
}