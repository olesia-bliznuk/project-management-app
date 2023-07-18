import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { BoardComponent } from './components/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'boards', component: BoardComponent },
  { path: 'createBoard', component: CreateBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
