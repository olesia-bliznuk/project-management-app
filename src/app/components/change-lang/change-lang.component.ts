import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.css']
})
export class ChangeLangComponent {
  constructor(public languageService: LanguageService) {
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

}
