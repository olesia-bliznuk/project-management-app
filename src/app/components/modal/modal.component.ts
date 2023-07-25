import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { RestApiService } from 'src/app/services/restapi.service';
import { OpenBoardService } from 'src/app/services/open-board.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  title!: string;
  description!: string;
  type!: string;

  @Output() closeModalEvent = new EventEmitter();

  constructor(private translateService: TranslateService,
    public restapiservice: RestApiService,
    public openBoardService: OpenBoardService) { }

    ngOnInit(): void {
      this.type = this.openBoardService.checkCreate();
    }

  closeModal() {
    this.closeModalEvent.emit();
    this.openBoardService.changeCreate();
  }

  create(){
    if (this.type === 'column')
      this.createColumn();
    else if(this.type === 'task') 
      this.createTask();
      else
      this.changeTask();

  }

  createColumn() {
    if (!this.title) {
      Swal.fire(this.translateService.instant('enterTitle'));
    }
    else {
      this.restapiservice.createColumn(this.title);
      this.closeModal();
    }
  }

  createTask(){
    if (!this.title || !this.description) {
      Swal.fire(this.translateService.instant('enterAllFields'));
    }
    else {
      this.restapiservice.createTask(this.openBoardService.getIdColumn(), this.title, this.description);
      this.closeModal();
    }
  }

  changeTask(){
    if (!this.title || !this.description) {
      Swal.fire(this.translateService.instant('enterAllFields'));
    }
    else {
      this.restapiservice.changeTask(this.openBoardService.getIdColumn(), this.openBoardService.getIdTask(), this.title, this.description);
      this.closeModal();
    }
  }
}
