import { Injectable } from '@angular/core';
import {
  Firestore,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IContact } from '../interfaces/IContact';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  public singleContact: IContact = {} as IContact;
  public contacts: IContact[] = [] as IContact[];

  constructor(private firestore: Firestore, private router: Router) {}

  async getContacts() {
    const collectionRef = collection(this.firestore, 'contacts');
    const querySnapshot = await getDocs(collectionRef);
    this.contacts = querySnapshot.docs.map((item) => {
      return { id: item.id, ...item.data() } as IContact;
    });
  }

  async getSingleContact(contactID: string | null) {
    const documentRef = doc(this.firestore, 'contacts/' + contactID);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      this.singleContact = documentSnapshot.data() as IContact;
    }
  }

  async deleteContact(id: string) {
    const documentRef = doc(this.firestore, 'contacts', id);
    await deleteDoc(documentRef);
  }
}
