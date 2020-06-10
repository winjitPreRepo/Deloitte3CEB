import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpGenericService } from '../core/http/http-genric.service';

@Injectable({
  providedIn: 'root'
})
export class HttpGenericSerivce extends HttpGenericService {
  constructor(http: HttpClient) {
    super(http);
  }
}
