import { Component } from '@angular/core';
import { addDoc, Firestore, collection } from '@angular/fire/firestore';
import { contacts } from 'src/app/database/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private firestore: Firestore) {
    // this.addContact();
  }

  async addContact() {
    const db = collection(this.firestore, 'contacts');

    for (const contact of contacts) {
      await addDoc(db, contact);
    }
  }
}
