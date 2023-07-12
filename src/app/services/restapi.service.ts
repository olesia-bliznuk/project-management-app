import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  response: any;

  constructor(private http: HttpClient) {
  }

  public registration(userName: string, userLogin: string, userPassword: string): void {
    this.http.post('http://0.0.0.0:3000/auth/signup',
      {
        "name": userName,
        "login": userLogin,
        "password": userPassword,
      }
    ).subscribe((response) => {
      this.response = response;
      // if (this.response)
      console.log(this.response);
    })
  }

  public signIn(userLogin: string, userPassword: string): void{
    this.http.post('http://0.0.0.0:3000/auth/signin',
      {
        "login": userLogin,
        "password": userPassword,
      }
    ).subscribe((response) => {
      this.response = response;
      console.log(this.response);
    })
  }
}