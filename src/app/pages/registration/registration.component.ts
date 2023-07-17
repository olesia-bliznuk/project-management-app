import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';

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
    public restapi: RestApiService,
    private translateService: TranslateService) {
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  registratin(): void {
    if (this.userName && this.userLogin && this.userPassword)
      this.restapi.registration(this.userName, this.userLogin, this.userPassword);
    else
      Swal.fire(this.translateService.instant('notAllFiels'));
  }

}
