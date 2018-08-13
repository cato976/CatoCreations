import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
//import { NgModel } from '@angular/forms';

const appRoutes: Routes = [
  //{ path: '', component: AppComponent },
  //{ path: '', component: HomeComponent },
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  //  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },

  // otherwise redirect to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**', component: PageNotFoundComponent//, redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
