import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { JWTTokenResponse } from '../../shared/models/JWTTokenAuthentication';
import { CredentialsService } from '../authentication/credentials.service';
import { HttpGenericSerivce } from 'src/app/shared/http-genric.service';
import { UserConcurrentLogin } from '../../shared/models/ApplicationUser';
/**
 * Adds a default error handler to all requests.
 */
@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
    jWTTokenResponse: JWTTokenResponse = {};
    currentUser: any;
    logout: UserConcurrentLogin = {}
    constructor(private authenticationService: AuthenticationService,
        private route: Router, private credentialsService: CredentialsService,
        private http: HttpClient,
        private httpGenericSerivce: HttpGenericSerivce) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => this.errorHandler(error, next, request)));
    }

    // Customize the default error handler here if needed
    private errorHandler(response: any, next: any, Oldrequest: any): Observable<HttpEvent<any>> {
        this.currentUser = this.credentialsService.credentials;
        let errorMessage = '';
        if (response.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${response.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Status: ${response.status}\nMessage: ${response.message}`;
        }

        if ([403, 0].indexOf(response.status) !== -1) {
            this.authenticationService.logout();
            localStorage.clear();
        }
        throw response;
    }

}
