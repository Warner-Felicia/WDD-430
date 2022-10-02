import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Felicia Warner';
  id = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message(this.id, subject, msgText, this.currentSender);
       
    this.id++;

    this.addMessageEvent.emit(message);

  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';

  }
}
