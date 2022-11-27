import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangeEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
