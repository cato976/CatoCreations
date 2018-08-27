import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeLoggedInComponent } from './home-logged-in.component';
import { EnvironmentSpecificResolver } from '../_services/environment-specific-resolver.service';
import { AuthGuard } from '../_guards';

const homeRoutes: Routes = [
    { 
        path: 'home', 
        component: HomeComponent,
        resolve: { enSpecific: EnvironmentSpecificResolver }
    },
    {
        path: 'home-logged-in',
        canActivate: [AuthGuard],
        component: HomeLoggedInComponent,
        resolve: { enspecific: EnvironmentSpecificResolver }
    },
    //{
    //    path: '**', redirectTo: '' 
    //}
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        EnvironmentSpecificResolver
    ]
})
export class HomeRoutingModule { }
