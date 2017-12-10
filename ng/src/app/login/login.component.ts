import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';



interface Credentials {
  email: string;
  password: string;
}


/**
 * Routed component used to faciliate login to the ticketing system.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: Credentials = { email: '', password: '' };
  public errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {}

  /**
   * Attempt to log the user in with the given credentials.
   * Re-route to the tickets list page on success.
   */
  login(form: NgForm) {
    const { email, password } = this.credentials;

    if (!form.valid) {
      this.errorMsg = 'Please enter both fields';
      return;
    }

    this.authService.login(email, password)
      .then(() => this.router.navigate(['/tickets']))
      .catch(() => {
        this.errorMsg = 'Please check your credentials';
      });
  }

}
