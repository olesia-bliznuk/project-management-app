import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { OpenBoardService } from 'src/app/services/open-board.service';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardsComponent{

    dataToShow: any;

    constructor(private router: Router,
        public restapiservice: RestApiService,
        private translateService: TranslateService,
        public openBoardService: OpenBoardService) {
    }

    deleteBoard(event: Event, id: string){
        Swal.fire({
            title: this.translateService.instant('AreYouSure'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#44b78b',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translateService.instant('YesDeleteBoard'),
            cancelButtonText: this.translateService.instant('cancel')
        }).then((result) => {
            if (result.isConfirmed) {
                this.restapiservice.deleteBoard(id);
                Swal.fire(
                    this.translateService.instant('DeleteBoard')
                )
            }
        });
        event.stopPropagation();
    }

    openBoard(id: string, title: string){
        this.router.navigate(['/board']);
        this.openBoardService.setData(id, title);
    }
}
