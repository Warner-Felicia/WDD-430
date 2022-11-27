import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable()
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.http.get<{message: string, documents: Document[]}>(
      'http://localhost:3000/documents'
    ).subscribe(
      (responseData: {message: string, documents: Document[]}) => {
        this.documents = responseData.documents;
        this.sortAndSend();
      }
    );
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents',
      newDocument,
      { headers }
    ).subscribe(responseData => {
      this.documents.push(responseData.document);
      this.sortAndSend();
    });
  }

  // storeDocuments() {
  //   const documentsString = JSON.stringify(this.documents);
  //   const headers = new HttpHeaders({ 'contentType': 'application/json' });
  //   this.http.put(
  //     'https://cms-fw-default-rtdb.firebaseio.com/documents.json',
  //     documentsString,
  //     { headers }
  //   ).subscribe(() => {
  //     this.documentListChangedEvent.next(this.documents.slice());
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const position = this.documents.findIndex(m => m.id === originalDocument.id);
    if (position < 0) {
      return;
    }

    //set id and of new document to id of old document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/documents/' + originalDocument.id,
      newDocument,
      { headers }
    ).subscribe((response: Response) => {
      this.documents[position] = newDocument;
      this.sortAndSend();
    });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const position = this.documents.findIndex(d => d.id === document.id);
    if (position < 0) {
      return;
    }

    this.http.delete(
      'http://localhost:3000/documents/' + document.id
    ).subscribe((response: Response) => {
      this.documents.splice(position, 1);
      this.sortAndSend();
    })
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  sortAndSend() {
    const sortedDocuments = this.documents.sort((a, b) => a.name > b.name ? 1 : -1);
    this.documents = sortedDocuments;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}