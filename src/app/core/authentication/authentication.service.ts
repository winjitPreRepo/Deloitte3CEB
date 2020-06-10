import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CredentialsService } from './credentials.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private credentialsService: CredentialsService) { }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: any): Observable<any> {
    this.credentialsService.setCredentials(context, true);
    return of(context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

}
