import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { PasswordControlComponent } from './components/password-control/password-control.component';
import { UsernameControlComponent } from './components/username-control/username-control.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { TodoComponent } from './components/todo/todo.component';
import { CanUpdatePipe } from './pipes/can-update.pipe';
import { CanSharePipe } from './pipes/can-share.pipe';
import { CanDeletePipe } from './pipes/can-delete.pipe';
import { ShareModalComponent } from './components/share-modal/share-modal.component';
import { TodoDetailModalComponent } from './components/todo-detail-modal/todo-detail-modal.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        TodosComponent,
        NavbarComponent,
        ProfileComponent,
        EmailControlComponent,
        PasswordControlComponent,
        UsernameControlComponent,
        SubmitButtonComponent,
        AlertsComponent,
        NewTodoComponent,
        TodoComponent,
        CanUpdatePipe,
        CanSharePipe,
        CanDeletePipe,
        ShareModalComponent,
        TodoDetailModalComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule], providers: [
        AuthService,
        AuthGuard,
        TodoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
