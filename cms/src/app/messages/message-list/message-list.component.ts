import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1234, 'Halloween Party', 'Just checking in on plans for the Halloween party', 'Jane Smythe'),
    new Message(1235, 'Christmast Party', 'Just checking in on plans for the Christmas party', 'Valerie Austin'),
    new Message(1236, 'Thanksgiving Party', 'Just checking in on plans for the Thanksgiving party', 'Hank Stottlemeyer')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
