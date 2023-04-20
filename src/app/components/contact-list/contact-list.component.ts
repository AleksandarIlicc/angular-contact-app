import { Component, Input, OnInit } from '@angular/core';

import { IContact } from 'src/app/interfaces/IContact';

import { faPencilAlt, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';

import { ContactsService } from 'src/app/services/contacts.service';

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

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {}

  async deleteContact(id: string) {
    await this.contactsService.deleteContact(id);
    this.contactsList = this.contactsList.filter(
      (contact) => contact.id !== id
    );
  }
}
