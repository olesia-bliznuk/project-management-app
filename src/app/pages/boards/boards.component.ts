import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.css']
})
export class BoardComponent {

    constructor(private router: Router) {
    }
}
