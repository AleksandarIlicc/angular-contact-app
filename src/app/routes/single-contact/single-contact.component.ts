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
} from '@fortawesome/free-solid-svg-icons';
import {
  Firestore,
  collection,
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
  public loading: boolean = true;
  public errorMessage!: Error;

  public icon = {
    faEnvelope,
    faPhoneAlt,
    faLocationArrow,
    faBuilding,
    faUserFriends,
    faSuitcase,
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
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.errorMessage = error as Error;
    }
  }
}
