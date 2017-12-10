import { Component, OnInit } from '@angular/core';

import { TicketService } from '../ticket.service';


/**
 * Routed component used to display all tickets to an authenticated user.
 */
@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit {
  public tickets: any[];

  constructor(private ticketService: TicketService) { }

  /**
   * Retrieve the tickets from the service on load
   */
  ngOnInit() {
    this.ticketService.list().then(tickets => {
      this.tickets = tickets;
    });
  }
}
