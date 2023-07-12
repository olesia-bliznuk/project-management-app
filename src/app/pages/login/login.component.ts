import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLogin: string = "";
  userPassword: string = "";

  constructor(private router: Router,
    public restapi: RestApiService) {
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  signIn(): void{
    this.restapi.signIn(this.userLogin, this.userPassword);
  }

}
