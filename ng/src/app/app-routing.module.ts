import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { LoginComponent } from './login/login.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

/**
 * Basic routing.
 *
 * Note: No attempt made to prevent unauthenticated users from hitting
 * authenticated endpoints. Ran out of time.
 * https://angular.io/guide/router#milestone-5-route-guards
 */
const routes: Routes = [
  {
    path: 'tickets',
    component: ListTicketsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'new',
    component: NewTicketComponent
  },
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
