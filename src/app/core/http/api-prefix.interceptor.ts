import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsService } from "../authentication/credentials.service";
/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(public credentialsService: CredentialsService) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("assets/")) {
      let token = this.credentialsService.token; //JSON.parse(localStorage.getItem('currentUser'));
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`, responseType: "JSON"
          }, url: environment.endPoint + request.url
        });
      } else
        request = request.clone({ url: environment.endPoint + request.url });
    }
    return next.handle(request);
  }
}
