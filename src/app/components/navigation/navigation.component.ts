import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RestApiService } from 'src/app/services/restapi.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  constructor(public languageService: LanguageService,
    private router: Router,
    private translateService: TranslateService,
    public restapiservice: RestApiService) {
  }

  ngOnInit(): void {
    this.restapiservice.autoSignIn();
  }

  openRegistration(): void {
    this.router.navigate(['/registration']);
  }

  openLogin(): void {
    this.router.navigate(['/login']);
  }

  openStartPage(): void {
    this.router.navigate(['']);
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang); 
  }

  openAdminPage(): void {
    this.router.navigate(['admin']);
  }

  openCreateBoard(): void {
    this.router.navigate(['createBoard']);
  }

  logOut():void{
    this.restapiservice.deleteAutoSignIn();
    this.router.navigate(['']);
  }
}
