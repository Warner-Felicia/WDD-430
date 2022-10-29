import { EventEmitter } from '@angular/core';
import { MaxValidator } from '@angular/forms';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

export class DocumentService {
    documents: Document[];
    documentSelectedEvent = new EventEmitter<Document>();
    documentListChangedEvent = new Subject<Document[]>();
    maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
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
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);

    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const position = this.documents.indexOf(originalDocument);
        if(position < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        this.documents[position] = newDocument;
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);

    }

    deleteDocument(document: Document) {
        if(!document) {
            return;
        }
        
        const position = this.documents.indexOf(document);
        if (position < 0) {
            return;
        }
        
        this.documents.splice(position, 1);
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
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