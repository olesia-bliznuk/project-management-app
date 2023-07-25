import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { ChangeLangComponent } from './components/change-lang/change-lang.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControlDirective, FormsModule } from '@angular/forms';
import { BoardsComponent } from './components/boards/boards.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CreateBoardComponent } from './components/create-board/create-board.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './pages/board/board.component';
import { ModalComponent } from './components/modal/modal.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    StartScreenComponent,
    ChangeLangComponent,
    RegistrationComponent,
    StartPageComponent,
    LoginComponent,
    AdministrationComponent,
    BoardsComponent,
    CreateBoardComponent,
    BoardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'ru'
      }
    ),
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
