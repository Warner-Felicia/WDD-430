import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber = 1;
  
  

  constructor() { }

  ngOnInit(): void {
  }

  onGameStart() {
    this.interval = setInterval(() => {
        this.intervalFired.emit(this.lastNumber);
        this.lastNumber++;
      }, 1000);
  }

  onGamePause() {
    clearInterval(this.interval);
  }

}
