import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
    contacts: Contact[] = [];
    contactSelectedEvent = new EventEmitter<Contact>();
    contactListChangeEvent = new Subject<Contact[]>();
    maxContactId: number;


    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
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
        const contactsListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactsListClone);
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
        const contactListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactListClone);
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
        const contactListClone = this.contacts.slice();
        this.contactListChangeEvent.next(contactListClone);
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