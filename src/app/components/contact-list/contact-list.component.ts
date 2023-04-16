import { Component, Input, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { faPencilAlt, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public loading: boolean = true;
  public emptyContactList = 'Your contact list is empty';
  public noUserPhoto: string =
    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';
  @Input() contactsList: IContact[] = [] as IContact[];
  icon = {
    faPencilAlt,
    faEye,
    faTimes,
  };

  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  async getContacts() {
    const collectionRef = collection(this.firestore, 'contacts');

    try {
      this.loading = true;
      const querySnapshot = await getDocs(collectionRef);
      this.contactsList = querySnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as IContact;
      });
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  deleteContact(id: string) {
    const documentRef = doc(this.firestore, 'contacts', id);
    deleteDoc(documentRef);
    this.getContacts();
  }
}
