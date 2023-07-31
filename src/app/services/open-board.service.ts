import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenBoardService {

  private BoardId!: string;
  private ColumnId!: string;
  private title!: string;
  private createColumn!: string;
  private TaskId!: string;


  setData(id: string, title: string) {
    this.BoardId = id;
    this.title = title;
  }

  getId(): any {
    return this.BoardId;
  }

  getTitle(): any {
    return this.title;
  }

  changeCreate(element: string = ''): void {
    this.createColumn = element;
  }

  checkCreate(): string {
    return this.createColumn;
  }

  getIdColumn(): any {
    return this.ColumnId;
  }

  setIdColumn(id: string){
    this.ColumnId = id;
  }

  getIdTask(): any {
    return this.TaskId;
  }

  setIdTask(id: string){
    this.TaskId = id;
  }
}
