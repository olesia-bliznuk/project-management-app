import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  token: any;
  expirationDate: any;
  response: any;

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
    if (storedToken && storedExpirationDate) {
      const expirationDate = new Date(storedExpirationDate);
      if (expirationDate > new Date()) {
        this.token = storedToken;
      }
    }
  }

  public deleteAutoSignIn(): void{
    this.token = "";
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
}