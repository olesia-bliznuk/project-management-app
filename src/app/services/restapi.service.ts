import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';

interface Users {
  "_id": "string",
  "name": "string",
  "login": "string"
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  token: any;
  currentLogin: any;
  expirationDate: any;
  response: any;
  allUsers: any;

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
        console.error('Error:', error);
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
        console.error('Error:', error);
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
      }
    }
  }

  public deleteAutoSignIn(): void {
    this.token = "";
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('login');
  }

  // public getAllUsers() {

  //   const url = 'http://0.0.0.0:3000/users';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   this.http.get(url, { headers }).subscribe(
  //     (data) => {
  //       this.allUsers = data;
  //       console.log(this.allUsers)
  //     },
  //     (error) => {
  //       Swal.fire(this.translateService.instant('error400'));
  //     })
  // }

  // async getAllUsers() {
  //   const url = 'http://0.0.0.0:3000/users';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   try {
  //     const data = await this.http.get(url, { headers }).toPromise();
  //     this.allUsers = data;
  //     console.log(this.allUsers);
  //     // Выполняем другие действия, которые должны произойти после выполнения запроса
  //   } catch (error) {
  //     Swal.fire(this.translateService.instant('error400'));
  //   }
    
  // }


  // public getCurrentUser() {
  //   this.getAllUsers()
  //   return this.allUsers.filter((value: { login: any; }) => value.login === this.currentLogin)[0];
  // }

  // public removeUser(): void {
  //   const currentUser = this.getCurrentUser();
  //   const url = `http://0.0.0.0:3000/users/${currentUser._id}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   this.http.delete(url, { headers }).subscribe(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (error) => {
  //       Swal.fire(this.translateService.instant('error400'));
  //     });
  // }

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
      console.log(data);
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }

  public async changeUserInfo(userName: string, userLogin: string, userPassword: string){  
    try {
      const currentUser = await this.getCurrentUser();
      const url = `http://0.0.0.0:3000/users/${currentUser._id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

    
      const userData = {
        name: (userName) ? userName : currentUser.name ,
        login: (userLogin) ? userLogin : currentUser.login,
        password: (userPassword) ? userPassword : currentUser.password
      };
    
      const data = await this.http.put(url, userData, { headers }).toPromise();
      Swal.fire({
        icon: 'success',
        title: this.translateService.instant('changeInfoOk'),
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire(this.translateService.instant('error400'));
    }
  }
  
}