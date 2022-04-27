import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { TodoComponent } from "./todo/todo.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { TodoService } from "./todo.service";
import { TokenIncreptorService } from "./token-increptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIncreptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
