import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onGameStart() {
    setInterval(incrementNumber => {
      this.number += 1;
      console.log(this.number);
    }, 1000);
  }

  onGameEnd() {
    console.log('here');
  }

}
