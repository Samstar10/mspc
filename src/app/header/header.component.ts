import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userIsAuthenticated = false
  private authListenerSubs!: Subscription

  constructor( private authService: AuthService){ }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
    })
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy() {

  }

}
