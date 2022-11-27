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
    this.http.get<{ message: string, contacts: Contact[] }>(
      'http://localhost:3000/contacts'
    ).subscribe((responseData: { message: string, contacts: Contact[] }) => {
      this.contacts = responseData.contacts;
      this.contactListChangeEvent.next(this.contacts.slice());
    }, (error: any) => {
      console.log(error);
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    this.getContacts();
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
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to database
    this.http.post<{ message: String, contact: Contact }>(
      'http://localhost:3000/contacts',
      newContact,
      { headers }
    ).subscribe(responseData => {
      this.contacts.push(responseData.contact);
      this.contactListChangeEvent.next(this.contacts.slice());
    });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const position = this.contacts.findIndex(c => c.id === originalContact.id);
    if (position < 0) {
      return;
    }

    //set id of new contact to original contact
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/contacts/' + originalContact.id,
      newContact,
      { headers }
    ).subscribe((response: Response) => {
      this.contacts[position] = newContact;
      this.contactListChangeEvent.next(this.contacts.slice());
    });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const position = this.contacts.findIndex(c => c.id === contact.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/contacts/' + contact.id,
    ).subscribe((response: Response) => {
      this.contacts.splice(position, 1);
      this.contactListChangeEvent.next(this.contacts.slice());
    });
  }

  // storeContacts() {
  //   const contactsString = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders({ 'ContentType': 'application/json' })
  //   this.http.put(
  //     'https://cms-fw-default-rtdb.firebaseio.com/contacts.json',
  //     contactsString,
  //     { headers }
  //   ).subscribe(() => {
  //     this.contactListChangeEvent.next(this.contacts.slice());
  //   });
  // }

  // getMaxId(): number {
  //   let maxId = 0;
  //   for (let contact of this.contacts) {
  //     const currentId = parseInt(contact.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  // }
}