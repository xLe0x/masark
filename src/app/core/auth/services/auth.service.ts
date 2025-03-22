import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterRequest } from '../models/register.model';
import { StorageService } from '../../../shared/services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private userService = inject(UserService);
  constructor() {}

  login({ identifier, password }: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
        identifier,
        password,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  register({ username, email, password }: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }

  logout() {
    this.storageService.remove('token');
    this.userService.updateToken(null);
    this.router.navigateByUrl('/auth/login');
    this.toast.showToast('تم تسجيل الخروج بنجاح', 'success');
  }
}
