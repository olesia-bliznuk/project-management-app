import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(public translate: TranslateService) {
  }

  public toggleLanguage(): void {
    if (this.translate.currentLang === 'en')
      this.translate.use('ru');
    else
      this.translate.use('en');
  }
}
