import { Component, HostListener } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { contacts, groups } from 'src/app/database/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public browserWidth: number = 480;
  public mobileBrowserWidth: number = 481;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.target as Window;
    this.browserWidth = window.innerWidth;
  }

  constructor(private firestore: Firestore) {}

  // contacts added initially
  async addContacts() {
    const collectionRef = collection(this.firestore, 'contacts');

    for (const contact of contacts) {
      await addDoc(collectionRef, contact);
    }
  }

  // groups added initially
  async addGroups() {
    const collectionRef = collection(this.firestore, 'groups');

    for (const group of groups) {
      await addDoc(collectionRef, group);
    }
  }
}
