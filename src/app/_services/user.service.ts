import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvironmentSpecificService } from './environment-specific.service'
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private envSpecificSvc: EnvironmentSpecificService) {
    }

    getAll() {
        return this.http.get<User[]>(`${this.envSpecificSvc.envSpecific.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.envSpecificSvc.envSpecific.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${this.envSpecificSvc.envSpecific.apiUrl}/users/register`, user);
    }

    //create(user: User) {
    //    return this.http.post('/api/users', user);
    //}

    update(user: User) {
        return this.http.put(`${this.envSpecificSvc.envSpecific.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.envSpecificSvc.envSpecific.apiUrl}/users/` + id);
    }
}
