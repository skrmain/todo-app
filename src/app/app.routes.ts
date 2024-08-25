import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './pages/login.component';
import { ProfileComponent } from './pages/profile.component';
import { SignupComponent } from './pages/signup.component';
import { TodosComponent } from './pages/todos.component';

export const routes: Routes = [
    {
        path: '',
        component: TodosComponent,
        canActivate: [AuthGuard],
        title: 'TodoApp',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'TodoApp | Login',
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'TodoApp | Signup',
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        title: 'TodoApp | Profile',
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
