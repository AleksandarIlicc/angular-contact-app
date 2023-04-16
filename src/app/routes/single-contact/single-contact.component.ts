import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/interfaces/IContact';
import {
  faEnvelope,
  faPhoneAlt,
  faLocationArrow,
  faBuilding,
  faUserFriends,
  faSuitcase,
  faPencilAlt,
  faEye,
  faTimes,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss'],
})
export class SingleContactComponent implements OnInit {
  public contactID: string | null = null;
  public singleContact: IContact = {} as IContact;
  public contacts: IContact[] = [] as IContact[];
  public noUserPhoto: string =
    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';
  public loading: boolean = true;
  public errorMessage!: Error;

  public icon = {
    faEnvelope,
    faPhoneAlt,
    faLocationArrow,
    faBuilding,
    faUserFriends,
    faSuitcase,
    faPencilAlt,
    faEye,
    faTimes,
    faTrash,
    faPlus,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactID = param.get('id');
    });
    if (this.contactID) {
      this.getSingleContact(this.contactID);
    }
    this.getContacts();
  }

  async getContacts() {
    const collectionRef = collection(this.firestore, 'contacts');

    try {
      this.loading = true;
      const querySnapshot = await getDocs(collectionRef);
      this.contacts = querySnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as IContact;
      });
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  async getSingleContact(contactID: string) {
    const documentRef = doc(this.firestore, 'contacts/' + contactID);
    
    try {
      this.loading = true;
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        this.singleContact = documentSnapshot.data() as IContact;
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      this.errorMessage = error as Error;
    }
  }

  deleteContact(id: string) {
    const documentRef = doc(this.firestore, 'contacts', id);
    deleteDoc(documentRef);
  }
}
