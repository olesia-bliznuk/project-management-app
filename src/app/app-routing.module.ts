import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { BoardComponent } from './pages/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'boards', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
