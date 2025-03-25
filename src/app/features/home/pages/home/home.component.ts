import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../../core/layout/components/navbar/navbar.component';
import { User, UserResponse } from '../../../../core/auth/models/user.model';
import { UserService } from '../../../../core/auth/services/user.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  private userService = inject(UserService);
  userSig = signal<User | null>(null);

  ngOnInit() {
    this.userService.fetchUser().subscribe({
      next: ({ data }: UserResponse) => {
        this.userSig.set(data);
        console.log(data);
      },
    });
  }
}
