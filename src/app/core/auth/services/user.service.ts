import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
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
  constructor() {}

  private _tokenSig = signal<string | null>(this.storageService.get('token'));
  private _userSig = signal<User | null>(null);
  private fetchUser() {
    if (!this._tokenSig()) return;

    this.http
      .get<UserResponse>(`${environment.apiUrl}/user/@me`, {
        headers: {
          Authorization: `Bearer ${this._tokenSig}`,
        },
      })
      .subscribe({
        next: ({ data }: UserResponse) => {
          console.log(data);
          this._userSig.set(data);
        },
      });
  }

  isLoggedIn = computed(() => !!this._tokenSig());

  user(): User | null {
    return this._userSig();
  }
}
