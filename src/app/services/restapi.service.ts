import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  token: any;
  currentLogin: any;
  expirationDate: any;
  response: any;
  allUsers: any;
  allBoards: any;

  constructor(private http: HttpClient,
    private translateService: TranslateService,
    private router: Router) {
  }

  public registration(userName: string, userLogin: string, userPassword: string): void {

    fetch('http://0.0.0.0:3000/auth/signup', {
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
            Swal.fire(this.translateService.instant('error409'));
          else
            Swal.fire(this.translateService.instant('error400'));
        } else {
          Swal.fire(this.translateService.instant('registOk'));
          setTimeout(() => this.router.navigate(['login']), 1000);
        }
      })
      .catch(error => {
        Swal.fire('Error:', error.message);
      });
  }

  public signIn(userLogin: string, userPassword: string): void {

    fetch('http://0.0.0.0:3000/auth/signin', {
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
            Swal.fire(this.translateService.instant('error401'));
          else
            Swal.fire(this.translateService.instant('error400'));
        }
        else {
          response.json().then(data => {
            this.token = data.token;
            this.router.navigate(['']);

            const today = new Date();
            this.expirationDate = new Date(today);
            this.expirationDate.setDate(today.getDate() + 5);

            localStorage.setItem('token', this.token);
            localStorage.setItem('expirationDate', this.expirationDate);
            localStorage.setItem('login', userLogin);
          });
        }
      })
      .catch(error => {
        Swal.fire('Error:', error.message);
      });
  }

  public autoSignIn(): void {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationDate');
    this.currentLogin = localStorage.getItem('login');
    if (storedToken && storedExpirationDate) {
      const expirationDate = new Date(storedExpirationDate);
      if (expirationDate > new Date()) {
        this.token = storedToken;
        this.getAllBoards();
      }
    }
  }

  public deleteAutoSignIn(): void {
    this.token = "";
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('login');
  }

  public async getAllUsers() {
    const url = 'http://0.0.0.0:3000/users';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    try {
      const data = await this.http.get(url, { headers }).toPromise();
      this.allUsers = data;
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }

  public async getCurrentUser() {
    try {
      await this.getAllUsers();
      return this.allUsers.filter((value: { login: any; }) => value.login === this.currentLogin)[0];
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }

  public async removeUser() {
    try {
      const currentUser = await this.getCurrentUser();
      const url = `http://0.0.0.0:3000/users/${currentUser._id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const data = await this.http.delete(url, { headers }).toPromise();
      this.deleteAutoSignIn();
      this.router.navigate(['']);
    } catch (error: any) {
      Swal.fire('Error:', error.message);
    }
  }

  public async changeUserInfo(userName: string, userLogin: string, userPassword: string) {
    try {
      const currentUser = await this.getCurrentUser();
      const url = `http://0.0.0.0:3000/users/${currentUser._id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const userData = {
        name: userName,
        login: userLogin,
        password: userPassword
      };

      const data = await this.http.put(url, userData, { headers }).toPromise();
      Swal.fire({
        icon: 'success',
        title: this.translateService.instant('changeInfoOk'),
        showConfirmButton: false,
        timer: 1500
      });
      this.currentLogin = userLogin;
      let storedLogin: any = localStorage.getItem("login");
      storedLogin = userLogin;
      localStorage.setItem("login", storedLogin);
    } catch (error: any) {
      if (error.status === 409)
        Swal.fire(this.translateService.instant('error409'));
      else
        Swal.fire(this.translateService.instant('error400'));
    }
  }

  public createBoard(title: string) {
    try {
      const url = `http://0.0.0.0:3000/boards`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      const userData = {
        "title": title,
        "owner": this.currentLogin,
        "users": this.currentLogin
      };

      const data = this.http.post(url, userData, { headers }).toPromise();
      Swal.fire({
        icon: 'success',
        title: this.translateService.instant('successBoard'),
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }

  public async getAllBoards() {
    try {
      const currentUser = await this.getCurrentUser();
      const url = `http://0.0.0.0:3000/boardsSet/${currentUser.login}`;
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const data = await this.http.get(url, { headers }).toPromise()
      .then(response => {
        this.allBoards = response;
      })
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }


  public deleteBoard(id: string){
    try {
      const url = `http://0.0.0.0:3000/boards/${id}`;
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
      const data = this.http.delete(url, { headers }).toPromise();
      this.allBoards = this.allBoards.filter((item: { _id: string; }) => item._id !== id);
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }



}