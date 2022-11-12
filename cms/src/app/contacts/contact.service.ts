import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

@Injectable()
export class ContactService {
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();
    contactListChangeEvent = new Subject<Contact[]>();
    maxContactId: number;

    constructor(private http: HttpClient) {
        this.http.get<Contact[]>(
            'https://cms-fw-default-rtdb.firebaseio.com/contacts.json'
        ).subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contactListChangeEvent.next(this.contacts.slice());
        }, (error: any) => {
            console.log(error);
        });
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string): Contact {
        for (const contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            }
        }
        return null;
        
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            return;
        }
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        this.storeContacts();
    }

    storeContacts() {
        const contactsString = JSON.stringify(this.contacts);
        const headers = new HttpHeaders({ 'ContentType': 'application/json' })
        this.http.put(
            'https://cms-fw-default-rtdb.firebaseio.com/contacts.json',
            contactsString,
            { headers }
        ).subscribe(() => {
            this.contactListChangeEvent.next(this.contacts.slice());
        });
        
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || ! newContact) {
            return;
        }
        const position = this.contacts.indexOf(originalContact);
        if (position < 0) {
            return;
        }
        newContact.id = originalContact.id;
        this.contacts[position] = newContact;
        this.storeContacts();
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const position = this.contacts.indexOf(contact);
        if (position < 0) {
            return;
        }
        this.contacts.splice(position, 1);
        this.storeContacts();
    }

    getMaxId(): number {
        let maxId = 0;
        for (let contact of this.contacts) {
            const currentId = parseInt(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }
}