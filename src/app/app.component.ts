import { Component } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { contacts, groups } from 'src/app/database/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private firestore: Firestore) {
    // this.addContacts();
    // this.addGroups();
  }

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
