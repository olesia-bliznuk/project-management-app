import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

    userLogin: string = "";
    userName: string = "";
    userPassword: string = "";

    constructor(private router: Router,
        public restapi: RestApiService,
        private translateService: TranslateService,) {
    }

    openStartPage(): void {
        this.router.navigate(['']);
    }

    removeUser(): void {

        Swal.fire({
            title: this.translateService.instant('AreYouSure'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#44b78b',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translateService.instant('YesDelete'),
            cancelButtonText: this.translateService.instant('cancel')
        }).then((result) => {
            if (result.isConfirmed) {
                this.restapi.removeUser();
                Swal.fire(
                    this.translateService.instant('DeleteAcc')
                )
            }
        })
    }

    changeInfo() {
        if ((this.userName.length >= 6 || this.userName.length === 0) &&
            (this.userLogin.length >= 6 || this.userLogin.length === 0) &&
            (this.userPassword.length >= 6 || this.userPassword.length === 0)) {
            this.restapi.changeUserInfo(this.userName, this.userLogin, this.userPassword);
        }
        else {
            Swal.fire(
                this.translateService.instant('incorrectData')
            )
        }
    }
}
