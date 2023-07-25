import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/restapi.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { OpenBoardService } from 'src/app/services/open-board.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  showModal = false;
  public title?: string;
  editingTitleBoard = false;
  editedTitleColumn: string = "";
  editingItemId: string | null = null;
  editedTitleBoard?: string;
  private idBoard?: string;

  constructor(private router: Router,
    public openBoardService: OpenBoardService,
    public restApiService: RestApiService,
    private translateService: TranslateService,) {
  }

  ngOnInit(): void {
    this.idBoard = this.openBoardService.getId();
    this.title = this.openBoardService.getTitle();
    this.editedTitleBoard = this.title;
    if (!this.idBoard) {
      this.openStartPage();
    }
    else {
      this.restApiService.getColumnsBoard(this.idBoard);
    }
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  createColumn(): void {
    this.showModal = true;
    this.openBoardService.changeCreate('column');
  }

  closeModal() {
    this.showModal = false;
    this.openBoardService.changeCreate();
  }

  deleteColumn(event: Event, id: string) {
    Swal.fire({
      title: this.translateService.instant('AreYouSure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44b78b',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translateService.instant('YesDeleteColumn'),
      cancelButtonText: this.translateService.instant('cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.restApiService.deleteColumn(id);
        Swal.fire(
          this.translateService.instant('DeleteColumn')
        )
      }
    });
    event.stopPropagation();
  }

  createTask(id: string) {
    this.openBoardService.setIdColumn(id);
    this.showModal = true;
    this.openBoardService.changeCreate('task');
  }

  getTasksByColumnId(id: string) {
    if (this.restApiService.allBoardTasks)
      return this.restApiService.allBoardTasks.filter((item: { columnId: string; }) => item.columnId === id);
    else
      return [];
  }

  deleteTask(event: Event, ColumnId: string, TaskId: string) {
    Swal.fire({
      title: this.translateService.instant('AreYouSure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44b78b',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translateService.instant('YesDeleteTask'),
      cancelButtonText: this.translateService.instant('cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.restApiService.deleteTask(ColumnId, TaskId);
        Swal.fire(
          this.translateService.instant('DeleteTask')
        )
      }
    });
    event.stopPropagation();
  }

  changeTask(event: Event, ColumnId: string, TaskId: string) {

    this.openBoardService.setIdColumn(ColumnId);
    this.openBoardService.setIdTask(TaskId);
    this.showModal = true;
    this.openBoardService.changeCreate('taskChange');
    event.stopPropagation();
  }

  saveTitleColumn(idColumn: string) {
    this.editingItemId = null;
    if (this.editedTitleColumn)
      this.restApiService.changeTitleColumn(idColumn, this.editedTitleColumn);
    else
      Swal.fire(this.translateService.instant('enterTitle'));
  }

  cancelTitleColumn() {
    this.editingItemId = null;
  }

  startEditingTitleColumn(itemId: string) {
    this.editingItemId = itemId;
    this.editedTitleColumn = this.restApiService.allColumns.find((item: { _id: string; }) => item._id === itemId)?.title || '';
  }

  cancelBoardColumn(){
    this.editingTitleBoard = false;
  }

  saveTitleBoard(){
    this.editingTitleBoard = false;
    if (this.editedTitleBoard){
      this.restApiService.changeTitleBoard(this.editedTitleBoard);
      this.title = this.editedTitleBoard;
    }
    else
      Swal.fire(this.translateService.instant('enterTitle'));
  }

  startEditingTitleBoard(){
    this.editingTitleBoard = true;
  }



}
