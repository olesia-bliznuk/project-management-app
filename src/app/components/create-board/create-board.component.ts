import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent {
  title: string = '';

  constructor(
    private router: Router,
    public restapiservice: RestApiService,
    private translateService: TranslateService,
    private swalService: SwalService) {
  }

  cancel() {
    this.router.navigate(['']);
  }

  createBoard() {
    if (this.title) {
      this.restapiservice.createBoard(this.title);
      this.cancel();
    }
    else
      this.swalService.swalFire(this.translateService.instant('enterTitle'));
  }
}
