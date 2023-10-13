import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TodosComponent } from './pages/todos/todos.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EmailControlComponent } from './components/email-control/email-control.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, SignupComponent, TodosComponent, NavbarComponent, ProfileComponent, EmailControlComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
    providers: [
        AuthService,
        AuthGuard,
        TodoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
