import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { User, UserResponse } from '../models/user.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private _tokenSig = signal<string | null>(this.storageService.get('token'));
  private _userSig = signal<User | null>(null);

  updateToken(value: string | null) {
    this._tokenSig.set(value);
  }

  fetchUser() {
    return this.http.get<UserResponse>(`${environment.apiUrl}/user/@me`, {
      headers: {
        Authorization: `Bearer ${this._tokenSig}`,
      },
    });
  }

  isLoggedIn = computed(() => this._tokenSig());

  user(): User | null {
    return this._userSig();
  }
}
