import { Component, OnInit } from '@angular/core';

import { CounterService } from './counter.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent implements OnInit{
  activeToInactiveCounter: number;
  inactivetoActiveCounter: number;

  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.activeToInactiveCounter = this.counterService.activeToInactiveCounter;
    this.inactivetoActiveCounter = this.counterService.inactiveToActiveCounter;

  }
}
