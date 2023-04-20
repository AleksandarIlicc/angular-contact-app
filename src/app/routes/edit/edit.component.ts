import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IContact } from 'src/app/interfaces/IContact';
import { IGroup } from 'src/app/interfaces/IGroup';

import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  public contactID: string | null = null;
  public singleContact: IContact = {} as IContact;
  public contactGroups: IGroup[] = [] as IGroup[];
  public loading: boolean = true;
  public errorMessage!: Error;
  public noUserPhoto: string =
    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactID = param.get('id');
    });
    if (this.contactID) {
      this.getSingleContact(this.contactID);
    }
    this.getGroups();
  }

  async getSingleContact(contactID: string) {
    this.loading = true;
    try {
      await this.contactsService.getSingleContact(contactID);
      this.singleContact = this.contactsService.singleContact;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error as Error;
      this.loading = false;
    }
  }

  async getGroups() {
    await this.contactsService.getGroups();
    this.contactGroups = this.contactsService.contactGroups;
  }

  async editContact() {
    try {
      this.contactsService.editContact(this.contactID);
    } catch (error) {
      this.errorMessage = error as Error;
    }
  }
}
