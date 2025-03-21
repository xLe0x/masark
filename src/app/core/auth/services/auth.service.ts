import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterRequest } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  constructor() {}

  public login({
    identifier,
    password,
  }: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
        identifier,
        password,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  public register({ username, email, password }: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }
}
