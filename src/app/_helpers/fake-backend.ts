import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    if (user != null) {
                        return user.userName === request.body.username && user.password === request.body.password;
                    }
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // register user

            if(request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { 
                    if(user != null){
                        return user.username === newUser.userName;
                    }
                }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } } );
                }

                // save new user
                newUser.id = users.length = 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                console.log("I want to redirect");
                //this.router.navigate(['/home-logged-in'], { queryParams: { returnUrl: state.url }});
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }


            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if(user != null) {
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown 
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
