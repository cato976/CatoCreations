import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },

  // otherwise redirext to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { enableTracing: true });
