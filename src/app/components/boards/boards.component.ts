import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import { TranslateService } from '@ngx-translate/core';
import { OpenBoardService } from 'src/app/services/open-board.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardsComponent {

    constructor(private router: Router,
        public restapiservice: RestApiService,
        private translateService: TranslateService,
        public openBoardService: OpenBoardService,
        public swalService: SwalService) {
    }

    deleteBoard(event: Event, id: string) {
        this.swalService.warning(this.translateService.instant('AreYouSure'), this.translateService.instant('YesDeleteBoard'))
            .then((result) => {
                if (result.isConfirmed) {
                    this.restapiservice.deleteBoard(id);
                    this.swalService.swalFire(this.translateService.instant('DeleteBoard'));
                }
            });
        event.stopPropagation();
    }

    openBoard(id: string, title: string) {
        this.router.navigate(['/board']);
        this.openBoardService.setData(id, title);
    }
}
