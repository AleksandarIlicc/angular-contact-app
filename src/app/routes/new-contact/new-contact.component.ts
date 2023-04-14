import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IContact } from 'src/app/interfaces/IContact';
import { IGroup } from 'src/app/interfaces/IGroup';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
})
export class NewContactComponent implements OnInit {
  public newContact: IContact = {} as IContact;
  public contactGroups: IGroup[] = [] as IGroup[];
  public isNotValidContact: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.getGroups();
  }

  public isIContact(obj: IContact): obj is IContact {
    return (
      'name' in obj && 'address' in obj && 'email' in obj && 'mobile' in obj
    );
  }

  async addContact() {
    const collectionRef = collection(this.firestore, 'contacts');

    if (this.isIContact(this.newContact)) {
      await addDoc(collectionRef, this.newContact);
      this.router.navigate(['/']);
    } else {
      this.isNotValidContact =
        'Make sure you have provided your name, address, email, and mobile number.';
    }
  }

  async getGroups() {
    const documentRef = collection(this.firestore, 'groups');
    const querySnapshot = await getDocs(documentRef);

    this.contactGroups = querySnapshot.docs.map((item) => {
      return { id: item.id, ...item.data() } as IGroup;
    });
  }
}
