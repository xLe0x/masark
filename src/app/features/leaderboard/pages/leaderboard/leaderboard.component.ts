import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../../../core/layout/components/navbar/navbar.component';
import { UserService } from '../../../../core/auth/services/user.service';
import { User, UserResponse } from '../../../../core/auth/models/user.model';
import { LeaderboardService } from '../../services/leaderboard.service';
import { ILeaderboard, ILeaderboardUser } from '../../models/leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  imports: [NavbarComponent],
  templateUrl: './leaderboard.component.html',
  styles: ``,
})
export class LeaderboardComponent implements OnInit {
  private leaderboardService = inject(LeaderboardService);
  usersSig = signal<ILeaderboardUser[]>([]);
  ngOnInit(): void {
    this.leaderboardService.getLeaderboard().subscribe({
      next: ({ data }: ILeaderboard) => {
        this.usersSig.set(data);
      },
    });
  }
}
