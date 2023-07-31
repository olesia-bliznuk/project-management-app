import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RestApiService } from 'src/app/services/restapi.service';
import { OpenBoardService } from 'src/app/services/open-board.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title!: string;
  description!: string;
  type!: string;

  @Output() closeModalEvent = new EventEmitter();

  constructor(private translateService: TranslateService,
    public restapiservice: RestApiService,
    public openBoardService: OpenBoardService,
    public swalService: SwalService) { }

  ngOnInit(): void {
    this.type = this.openBoardService.checkCreate();
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.openBoardService.changeCreate();
  }

  create() {
    if (this.type === 'column')
      this.createColumn();
    else if (this.type === 'task')
      this.createTask();
    else
      this.changeTask();
  }

  createColumn() {
    if (!this.title) {
      this.swalService.error(this.translateService.instant('enterTitle'));
    }
    else {
      this.restapiservice.createColumn(this.title);
      this.closeModal();
    }
  }

  createTask() {
    if (!this.title || !this.description) {
      this.swalService.error(this.translateService.instant('enterAllFields'));
    }
    else {
      this.restapiservice.createTask(this.openBoardService.getIdColumn(), this.title, this.description);
      this.closeModal();
    }
  }

  changeTask() {
    if (!this.title || !this.description) {
      this.swalService.error(this.translateService.instant('enterAllFields'));
    }
    else {
      this.restapiservice.changeTask(this.openBoardService.getIdColumn(), this.openBoardService.getIdTask(), this.title, this.description);
      this.closeModal();
    }
  }
}
