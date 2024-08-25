import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
    },
    {
        path: 'todos',
        component: TodosComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
];
