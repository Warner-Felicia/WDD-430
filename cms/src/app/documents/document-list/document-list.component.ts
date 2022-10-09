import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [
    new Document('ARAB101', 'Arabic 1', 'An introductory Arabic language class that develops active speaking and listening skills in Arabic along with reading and writing skills in Modern Standard Arabic.  The dialect used is the one used in Palestine, Lebanon, Jordan, and Syria. The course will also introduce the students to the culture, religion and politics of the Middle East.', 'https://www.byui.edu/catalog#/courses/HJwd_APIH?bc=true&bcCurrent=ARAB101%20-%20Arabic%20I&bcGroup=Arabic&bcItemType=courses', []),
    new Document('AS333', 'Animal Genetics', 'This course covers the genetic principles and technologies involved in improving animal breeding in the context of productivity, sustainability, and welfare. Students will explore the  principles and technologies underlying the current mating systems used in animal breeding and maintenance.', 'https://www.byui.edu/catalog#/courses/4yeNKienoW?bc=true&bcCurrent=AS333%20-%20Animal%20Genetics&bcGroup=Animal%20Science&bcItemType=courseshttps://www.byui.edu/catalog#/courses/HJwd_APIH?bc=true&bcCurrent=ARAB101%20-%20Arabic%20I&bcGroup=Arabic&bcItemType=courses', []),
    new Document('ARCH225', 'Architectural Detailing', 'This course is designed to teach the skills necessary to clearly develop and communicate complex architectural and construction detailing. Proper modeling procedures needed to create building assemblies, integrated building systems, and full-scale mock-ups are explored. ', 'https://www.byui.edu/catalog#/courses/Bku3MEcAD?bc=true&bcCurrent=ARCH225%20-%20Architectural%20Detailing&bcGroup=Architecture&bcItemType=courses', []),
    new Document('CE360', 'Fluid Mechanics for Civil Engineers', 'Introduction to fluid mechanics and incompressible fluid flow, fluid statics, fluid dynamics, control volume analysis of fluid flow, dimensional analysis and scale models, internal and external viscous flow, turbomachinery, and open channel flow. Flow measurement lab included. This is similar to the ME360 fluids class in structure but the content is being changed to serve civil engineering students. ', 'https://www.byui.edu/catalog#/courses/4k0-ubp2-?bc=true&bcCurrent=CE360%20-%20Fluid%20Mechanics%20for%20Civil%20Engineers&bcGroup=Civil%20Engineering&bcItemType=courses', []),
    new Document('DANCE171', 'Clog Dance, Beginning', 'This is an introductory movement course where students will learn selected rhythms, styles, and techniques of clogging.  Basic terminology, elements, and steps will provide a fundamental understanding of the subject matter corresponding to its location and function within the dance world.', 'https://www.byui.edu/catalog#/courses/V1Woxhe3sW?bc=true&bcCurrent=DANCE171%20-%20Clog%20Dance%2C%20Beginning&bcGroup=Dance&bcItemType=courses', []),
  ]
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
