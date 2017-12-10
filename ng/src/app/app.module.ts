import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Routes
import { AppComponent } from './app.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { LoginComponent } from './login/login.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';

// Components
import { HeaderAuthComponent } from './header-auth/header-auth.component';

// Services
import { AuthService } from './auth.service';
import { RequestService } from './request.service';
import { StorageService } from './storage.service';
import { TicketService } from './ticket.service';


@NgModule({
  declarations: [
    AppComponent,
    NewTicketComponent,
    LoginComponent,
    ListTicketsComponent,
    HeaderAuthComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    RequestService,
    StorageService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
