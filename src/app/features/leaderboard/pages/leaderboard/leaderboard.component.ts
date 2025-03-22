import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../../../core/layout/components/navbar/navbar.component';
import { LeaderboardService } from '../../services/leaderboard.service';
import { ILeaderboard, ILeaderboardUser } from '../../models/leaderboard.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  imports: [NavbarComponent, RouterLink],
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
