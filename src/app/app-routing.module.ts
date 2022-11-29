import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "notes",
    pathMatch: "full",
  },
  {
    path: "notes",
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
