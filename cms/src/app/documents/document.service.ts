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
        this.http.get<Document[]>(
            'https://cms-fw-default-rtdb.firebaseio.com/documents.json'
        ).subscribe(
            (documents: Document[]) => {
                const sortedDocuments = documents.sort((a, b) => a.name > b.name ? 1 : -1);
                this.documents = sortedDocuments;
                this.maxDocumentId = this.getMaxId();
                this.documentListChangedEvent.next(documents.slice());

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
        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.storeDocuments;
    }

    storeDocuments() {
        const documentsString = JSON.stringify(this.documents);
        const headers = new HttpHeaders({ 'contentType': 'application/json' });
        this.http.put(
            'https://cms-fw-default-rtdb.firebaseio.com/documents.json',
            documentsString,
            { headers }
        ).subscribe(() => {
            this.documentListChangedEvent.next(this.documents.slice());
        }, (error: any) => {
            console.log(error);
        });
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const position = this.documents.indexOf(originalDocument);
        if (position < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        this.documents[position] = newDocument;
        this.storeDocuments();
    }

    deleteDocument(document: Document) {
        if (!document) {
            return;
        }

        const position = this.documents.indexOf(document);
        if (position < 0) {
            return;
        }

        this.documents.splice(position, 1);
        this.storeDocuments();
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
}