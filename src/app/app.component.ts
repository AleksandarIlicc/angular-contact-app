import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { contacts, groups } from 'src/app/database/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public browserWidth!: number;
  public mobileBrowserWidth: number = 481;

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.browserWidth = window.innerWidth;
      this.changeDetectorRef.detectChanges();
    });
  }

  // contacts added initially
  addContacts() {
    const collectionRef = collection(this.firestore, 'contacts');

    for (const contact of contacts) {
      addDoc(collectionRef, contact);
    }
  }

  // groups added initially
  addGroups() {
    const collectionRef = collection(this.firestore, 'groups');

    for (const group of groups) {
      addDoc(collectionRef, group);
    }
  }
}
