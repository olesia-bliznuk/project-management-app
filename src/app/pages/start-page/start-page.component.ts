import { Component } from '@angular/core';
import { RestApiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  constructor ( public restapiservice: RestApiService){
    
  }

}
