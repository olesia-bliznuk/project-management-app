import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userLogin: string = "";
  userName: string = "";
  userPassword: string = "";
  response: any;

  constructor(private router: Router,
    public restapi: RestApiService) {
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  registratin(): void {
    this.restapi.registration(this.userName, this.userLogin, this.userPassword);
  }

}
