import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { BoardsComponent } from './components/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'createBoard', component: CreateBoardComponent },
  { path: 'board', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
