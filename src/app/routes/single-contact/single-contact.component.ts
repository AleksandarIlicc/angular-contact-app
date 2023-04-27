import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { IContact } from 'src/app/interfaces/IContact';

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
  public icons = {
    faTrash,
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
    this.loading = true;
    try {
      await this.contactsService.getContacts();
      this.contacts = this.contactsService.contacts;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error as Error;
      this.loading = false;
    }
  }

  async getSingleContact(contactID: string) {
    this.loading = true;
    try {
      await this.contactsService.getSingleContact(contactID);
      this.singleContact = this.contactsService.singleContact;
    } catch (error) {
      this.errorMessage = error as Error;
      this.loading = false;
    }
  }

  async deleteContact(contactID: string) {
    const contactIndex = this.findContactIndex(contactID);

    if (contactIndex === -1) return;

    await this.deleteContactAtIndex(contactIndex);

    const nextContactToLoad = this.getNextContactToLoad(contactIndex);

    nextContactToLoad
      ? this.nextLoadContact(nextContactToLoad)
      : this.navigateToContacts();
  }

  private findContactIndex(contactID: string) {
    return this.contacts.findIndex((item) => item.id === contactID);
  }

  private async deleteContactAtIndex(index: number): Promise<void> {
    try {
      await this.contactsService.deleteContact(this.contacts[index].id);
      this.contacts.splice(index, 1);
      this.loading = false;
    } catch (error) {
      this.errorMessage = error as Error;
      this.loading = false;
    }
  }

  private getNextContactToLoad(currentIndex: number): IContact | null {
    const nextIndex = currentIndex + 1;
    const prevIndex = currentIndex - 1;

    return nextIndex < this.contacts.length
      ? this.contacts[nextIndex]
      : prevIndex >= 0
      ? this.contacts[prevIndex]
      : null;
  }

  private nextLoadContact(nextContactToLoad: IContact): void {
    const nextContactId = nextContactToLoad.id;
    this.router.navigateByUrl(`/contact/${nextContactId}`);
    this.contactParamID = nextContactId;
    this.getSingleContact(nextContactId);
  }

  private navigateToContacts(): void {
    this.router.navigateByUrl('/');
    this.singleContact = {} as IContact;
  }
}
