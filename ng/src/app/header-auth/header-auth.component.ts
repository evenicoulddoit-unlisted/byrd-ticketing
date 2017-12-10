import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User } from '../auth.service';


/**
 * Component used to display the authenticated status of the user.
 *
 * The user is present with the appropriate login/logout action given their
 * current authentication state.
 */
@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Retrieve and keep our user reference up to date
   */
  ngOnInit() {
    this.authService.subscribe(user => this.user = user);
  }

  /**
   * Log the user out and re-route to the submit new ticket page
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/new']);
  }
}
