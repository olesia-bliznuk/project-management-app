import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';

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
        private translateService: TranslateService,
        private swalService: SwalService) {
    }

    openStartPage(): void {
        this.router.navigate(['']);
    }

    removeUser(): void {
        this.swalService.warning(this.translateService.instant('AreYouSure'), this.translateService.instant('YesDelete'))
            .then((result) => {
                if (result.isConfirmed) {
                    this.restapi.removeUser();
                    this.swalService.swalFire(this.translateService.instant('DeleteAcc'));
                }
            });
    }

    changeInfo() {
        if (this.userName.length >= 6 && this.userLogin.length >= 6 && this.userPassword.length >= 6) {
            this.restapi.changeUserInfo(this.userName, this.userLogin, this.userPassword);
        }
        else {
            this.swalService.error(this.translateService.instant('incorrectData'));
        }
    }
}
