import { Injectable } from '@angular/core';

import { RequestService } from './request.service';


const URGENCIES = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
};

const STATUSES = {
  o: 'Open',
  p: 'In Progress',
  c: 'Complete',
  r: 'Rejected'
};

const TYPES = {
  b: 'Bug Peport',
  f: 'Feature Request',
  o: 'Other'
};


/**
 * A very naive representation of a ticket.
 *
 * Simply expands on the ticket data to provide labels for the choice fields.
 * This would be better if the server was the single source of truth.
 */
class Ticket {
  constructor(data = {}) {
    Object.keys(data).forEach(key => this[key] = data[key]);
  }

  pk?: number;
  requester_name: string;
  requester_email: string;
  subject: string;
  type: string;
  urgency: number;
  message: string;
  status: string;

  get statusLabel() {
    return STATUSES[this.status];
  }

  get urgencyLabel() {
    return URGENCIES[this.urgency];
  }

  get typeLabel() {
    return TYPES[this.type];
  }
}


/**
 * Service to create and retrieve tickets from the public API.
 */
@Injectable()
class TicketService {
  constructor(private requestService: RequestService) { }

  public create(ticket: Ticket): Promise<void> {
    return this.requestService.post('tickets/', ticket);
  }

  public list(): Promise<Ticket[]> {
    return this.requestService.get(`tickets/`).then(ticketData => {
      return ticketData.map(data => {
        return new Ticket(data);
      });
    });
  }

  public get(id: number): Promise<Ticket> {
    return this.requestService.get(`tickets/${id}/`);
  }
}


export { Ticket, TicketService };
