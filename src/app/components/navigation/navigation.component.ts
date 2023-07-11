import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(public languageService: LanguageService,
    private router: Router,
    private translateService: TranslateService) {
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
    this.translateService.use(lang); // Изменение языка
  }

  openAdminPage(): void {
    this.router.navigate(['admin']);
  }
}
