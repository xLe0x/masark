import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
