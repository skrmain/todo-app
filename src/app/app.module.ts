import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { NotesComponent } from "./notes/notes.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { NotesService } from "./notes.service";
import { TokenInterceptorService } from "./token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupComponent,
    // NotesComponent,
    NavbarComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
