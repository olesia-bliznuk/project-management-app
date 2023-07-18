import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService) {
  }

  cancel() {
    this.router.navigate(['']);
  }

  createBoard() {
    if (this.title){
      this.restapiservice.createBoard(this.title);
      this.cancel();
    }
    else
      Swal.fire(this.translateService.instant('enterTitle'));
  }
}
