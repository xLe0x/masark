import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ILeaderboard } from '../models/leaderboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private http = inject(HttpClient);

  getLeaderboard(): Observable<ILeaderboard> {
    return this.http.get<ILeaderboard>(`${environment.apiUrl}/leaderboard`);
  }
}
