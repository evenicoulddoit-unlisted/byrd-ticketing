import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, User } from '../auth.service';
import { Ticket, TicketService } from '../ticket.service';


/**
 * Routed component used to create a new ticket for all users
 */
@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  public user: User;
  public data: Ticket = new Ticket();
  public errorMessage: string;
  public isComplete = false;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService
  ) { }

  /**
   * Retrieve the current user details.
   * This is used to present a button to the list page for authenticated users.
   */
  ngOnInit() {
    this.authService.subscribe(user => this.user = user);
  }

  /**
   * Attempt to create a ticket from the given ticket data.
   * Handle errors in the most trivial of ways.
   */
  public createTicket(form: NgForm) {
    const msg = 'Please check all form inputs are valid';

    if (!form.valid) {
      this.errorMessage = msg;
      return;
    }

    this.ticketService.create(this.data)
      .then(() => {
        this.isComplete = true;
      })
      .catch(() => {
        this.errorMessage = msg;
      });
  }
}
