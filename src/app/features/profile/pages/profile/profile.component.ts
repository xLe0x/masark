import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../../../core/layout/components/navbar/navbar.component';
import { ProfileService } from '../../services/profile.service';
import {
  ILeaderboard,
  ILeaderboardUser,
} from '../../../leaderboard/models/leaderboard.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { IProfile, IProfileResponse } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent implements OnInit {
  username = input.required<string>();
  user = signal<IProfile | null>(null);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.profileService.fetchUser(this.username()).subscribe({
      next: ({ data }: IProfileResponse) => {
        this.user.set(data);
      },
      error: () => {
        this.router.navigateByUrl('/');
        this.toast.showToast(
          'حدث خطأ ما. ربما إسم المستخدم غير موجود',
          'error'
        );
      },
    });
  }
}
