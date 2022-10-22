import { EventEmitter } from '@angular/core';
import { ROUTER_INITIALIZER } from '@angular/router';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();

    constructor() {
        this.contacts = MOCKCONTACTS;
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

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const position = this.contacts.indexOf(contact);
        if (position < 0) {
            return;
        }
        this.contacts.splice(position, 1);
        this.contactChangedEvent.emit(this.contacts.slice());
    }
}