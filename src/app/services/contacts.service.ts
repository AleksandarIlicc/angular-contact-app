import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Router } from '@angular/router';
import { IContact } from '../interfaces/IContact';
import { IGroup } from '../interfaces/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  public singleContact: IContact = {} as IContact;
  public contacts: IContact[] = [] as IContact[];
  public contactGroups: IGroup[] = [] as IGroup[];

  constructor(private firestore: Firestore, private router: Router) {}

  async getContacts(): Promise<void> {
    const collectionRef = collection(this.firestore, 'contacts');
    const querySnapshot = await getDocs(collectionRef);
    this.contacts = querySnapshot.docs.map((item) => {
      return { id: item.id, ...item.data() } as IContact;
    });
  }

  async getSingleContact(contactID: string | null): Promise<void> {
    const documentRef = doc(this.firestore, 'contacts/' + contactID);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      this.singleContact = documentSnapshot.data() as IContact;
    }
  }

  async addContact(newContact: IContact) {
    const collectionRef = collection(this.firestore, 'contacts');
    await addDoc(collectionRef, newContact);
  }

  async deleteContact(contactID: string): Promise<void> {
    const documentRef = doc(this.firestore, 'contacts/', contactID);
    await deleteDoc(documentRef);
  }

  async editContact(contactID: string | null): Promise<void> {
    const documentRef = doc(this.firestore, 'contacts/' + contactID);
    await updateDoc(documentRef, { ...this.singleContact });
    this.router.navigate(['/']);
  }

  async getGroups(): Promise<void> {
    const documentRef = collection(this.firestore, 'groups');
    const querySnapshot = await getDocs(documentRef);

    this.contactGroups = querySnapshot.docs.map((item) => {
      return { id: item.id, ...item.data() } as IGroup;
    });
  }
}
