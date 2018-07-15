import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
//import { routing } from './app.routing';

//import { AlertComponent } from './_directives/index';
//import { AuthGuard } from './_guards/index';
//import { JwtInterceptor } from './_helpers/index';
//import { AlertService, AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      //routing
  ],
    declarations: [
        AppComponent,
       // AlertComponent,
       // LoginComponent,
    ],
    providers: [
        //AuthGuard,
        //AlertService,
        //UserService,
        //{
        //    provide: HTTP_INTERCEPTORS,
        //    useClass: JwtInterceptor,
        //    multi: true
        //},
        //fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
