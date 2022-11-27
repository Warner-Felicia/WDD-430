import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
  messages: Message[] = [];
  messageListChangeEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, messages: Message[] }>(
      'http://localhost:3000/messages'
    ).subscribe(
      (responseData: { message: string, messages: Message[] }) => {
        this.messages= responseData.messages;
        this.messageListChangeEvent.next(this.messages.slice());
      }
    );
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    if (!message) {
      return
    }
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ successMessage: string, message: Message }>(
      'http://localhost:3000/messages',
      message,
      { headers }
    ).subscribe(responseData => {
      this.messages.push(responseData.message);
      this.messageListChangeEvent.next(this.messages.slice());
    });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return
    }

    const position = this.messages.findIndex(m => m.id === originalMessage.id)
    if (position < 0) {
      return
    }

    //set id of new message to original message id
    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update the database
    this.http.put(
      'http://localhost:3000/messages/' + originalMessage.id,
      newMessage,
      { headers }
    ).subscribe((response: Response) => {
      this.messages[position] = newMessage;
      this.messageListChangeEvent.next(this.messages.slice());
    });
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    this.http.put(
      'https://cms-fw-default-rtdb.firebaseio.com/messages.json',
      messagesString,
      { headers }
    ).subscribe(() => {
      this.messageListChangeEvent.next(this.messages.slice())
    }, (error: any) => {
      console.log(error);
    });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const position = this.messages.findIndex(m => m.id === message.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/messages' + message.id,
    ).subscribe((response: Response) => {
      this.messages.splice(position, 1);
      this.messageListChangeEvent.next(this.messages.slice());
    });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}