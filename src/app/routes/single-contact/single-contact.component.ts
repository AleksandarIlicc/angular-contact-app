import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
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
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss'],
})
export class SingleContactComponent implements OnInit {
  public contactParamID: string | null = null;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactParamID = param.get('id');
    });

    if (this.contactParamID) {
      this.getSingleContact(this.contactParamID);
      this.getContacts();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContacts();
      }
    });
  }

  async getContacts() {
    this.loading = true
    try {
      await this.contactsService.getContacts();
      this.contacts = this.contactsService.contacts;
      this.loading = false
    } catch (error) {
      this.errorMessage = error as Error;
      this.loading = false
    }
  }
  
  async getSingleContact(contactID: string) {
    this.loading = true
    try {
      await this.contactsService.getSingleContact(contactID);
      this.singleContact = this.contactsService.singleContact;
      
    } catch(error) {
      this.errorMessage = error as Error;
      this.loading = false
    }
  }
  
  async deleteContact(contactID: string) {
    try {
      await this.contactsService.deleteContact(contactID);
      
    } catch(error) {
      this.errorMessage = error as Error;
      this.loading = false
    }
  }
}
