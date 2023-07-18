import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent {
  title: string = '';
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'ifewfew', 'ewfweffe'];
  selectedItems: string[] = [];

  // Можно использовать этот метод, чтобы узнать выбранные элементы
  onSubmit() {
    console.log(this.selectedItems);
  }
}
