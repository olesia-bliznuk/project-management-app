import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

    constructor(private router: Router) {
    }
}
