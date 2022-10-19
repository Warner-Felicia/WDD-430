import { EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();

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
        // this.contacts.forEach(contact => {
        //     if (contact.id === id) {
        //         console.log('match');
        //         return contact;
        //     }
        // })
        return null;
        
    }
}