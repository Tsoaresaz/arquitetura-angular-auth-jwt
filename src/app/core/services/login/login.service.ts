import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../provider/provider';
import { Observable } from 'rxjs';
import { ILoginForm, ILoginResponse } from '../../interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  login(body: ILoginForm): Observable<ILoginResponse> {
    return this._http.post<ILoginResponse>(API.LOGIN, body);
  }
}
