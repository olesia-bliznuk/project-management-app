import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SwalService {

    constructor(private translateService: TranslateService,) {
    }

    public swalFire(title: string) {
        Swal.fire({
            title: title,
            confirmButtonColor: '#44b78b',
        });
    }

    public warning(title: string, confirmText: string) {
        return Swal.fire({
            title: title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#44b78b',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmText,
            cancelButtonText: this.translateService.instant('cancel')
        });
    }

    public success(title: string) {
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        });
    }

    public error(title: string) {
        return Swal.fire({
            icon: 'error',
            title: title,
            showConfirmButton: false,
            timer: 1500
        });
    }
}
