import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILeaderboard } from '../../leaderboard/models/leaderboard.model';
import { IProfile, IProfileResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  fetchUser(username: string): Observable<IProfileResponse> {
    return this.http.get<IProfileResponse>(
      `${environment.apiUrl}/profile/${username}`
    );
  }
}
