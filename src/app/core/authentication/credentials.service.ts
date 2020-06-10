import { Injectable } from '@angular/core';
var CryptoJS = require("crypto-js");
import * as consts from '../../shared/globle.constants'
import { Router } from '@angular/router';
const credentialsKey: string = 'UCRDE';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private _credentials: any | null = null;
  private Token: any | null = null;
  private applicationSetting = {};
  constructor(private router: Router) {
    this.updateCredentials();
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    this.updateCredentials();
    return !!this.credentials;
  }
  getSettingConfiguration() {
    return this.applicationSetting;
  }

  updateCredentials() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(this.decryptdata(savedCredentials));
    } else {
      this._credentials = null;
    }
  }
  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): any | null {
    this.updateCredentials();
    return this._credentials;
  }
  encryptdata(data: any) {
    try {
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), CryptoJS.enc.Utf8.parse(consts.AESEncryptionKey),
        {
          keySize: 128 / 8,
          iv: CryptoJS.enc.Utf8.parse(consts.AESEncryptionIV),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      return encrypted.toString();
    } catch (error) {
      this.setCredentials();
      //this.router.navigate(['/signIn']);
    }
  }

  decryptdata(data: any) {
    try {
      var decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(consts.AESEncryptionKey),
        {
          keySize: 128 / 8,
          iv: CryptoJS.enc.Utf8.parse(consts.AESEncryptionIV),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      this.setCredentials();
    }
  }
  get token(): any | null {
    let token = localStorage.getItem("APICRED");
    if (token)
      return this.decryptdata(localStorage.getItem("APICRED"));
  }

  setToken(token?: string) {
    if (token)
      localStorage.setItem("APICRED", this.encryptdata(token));
  }
  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: any, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, this.encryptdata(JSON.stringify(this._credentials)));
    } else {
      localStorage.clear();
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      this.setToken();
    }
  }

}
