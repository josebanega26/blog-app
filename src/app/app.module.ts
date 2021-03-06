import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from "./layout/layout.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MaterialModule } from "@material/material.module";
import { CoreModule } from "./core/core.module";
import { AuthInterceptor } from "./auth-interceptor";
import { MatButtonModule } from "@angular/material/button";
import { ErrorInterceptor } from "./error-interceptor";
import { MatDialogModule } from "@angular/material/dialog";
import { ErrorComponent } from "./error/error/error.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AboutMeComponent } from "./about-me/about-me.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    SpinnerComponent,
    ErrorComponent,
    NotFoundComponent,
    AboutMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
