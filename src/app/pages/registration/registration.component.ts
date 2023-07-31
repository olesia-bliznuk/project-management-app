import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userLogin: string = "";
  userName: string = "";
  userPassword: string = "";

  constructor(private router: Router,
    public restapi: RestApiService,
    private translateService: TranslateService,
    private swalServie: SwalService) {
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  registratin(): void {
    if (this.userName.length >= 6 && this.userLogin.length >= 6 && this.userPassword.length >= 6)
      this.restapi.registration(this.userName, this.userLogin, this.userPassword);
    else
      this.swalServie.error(this.translateService.instant('notAllFiels'));
  }

}
