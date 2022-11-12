import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
    messages: Message[] = [];
    messageChangedEvent = new Subject<Message[]>();
    maxMessageId: number;

    constructor(private http: HttpClient) {
        this.http.get<Message[]>(
            'https://cms-fw-default-rtdb.firebaseio.com/messages.json'
        ).subscribe((messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
            this.messageChangedEvent.next(this.messages.slice());
        }, (error: any) => {
            console.log(error);
        });
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
        this.messages.push(message);
        this.storeMessages();
    }

    storeMessages() {
        const messagesString = JSON.stringify(this.messages);
        const headers = new HttpHeaders({ 'ContentType': 'application/json'});
        this.http.put(
            'https://cms-fw-default-rtdb.firebaseio.com/messages.json',
            messagesString,
            { headers }
        ).subscribe(() => {
            this.messageChangedEvent.next(this.messages.slice())
        }, (error: any) => {
            console.log(error);
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