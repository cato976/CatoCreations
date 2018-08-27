import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EnvironmentSpecificService } from './environment-specific.service'
//import { User } from '../_models';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private envSpecificSvc: EnvironmentSpecificService) {}

    login(username: string, password: string) {
        return this.http.post<any>(`${this.envSpecificSvc.envSpecific.apiUrl}/users/authenticate`, { username: username, password: password })
            .map(user => {
                console.log("Yah authenticated");
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
