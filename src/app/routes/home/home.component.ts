import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { IContact } from 'src/app/interfaces/IContact';

import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public contacts: IContact[] = [] as IContact[];
  public contact: IContact = {} as IContact;
  public loading: boolean = true;
  public errorMessage!: Error;
  public searchTerm: string = '';

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContacts();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContacts();
      }
    });
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.getContacts();
  }

  async getContacts() {
    this.loading = true;
    try {
      await this.contactsService.getContacts();
      if (this.searchTerm) {
        this.contacts = this.contactsService.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.contacts = this.contactsService.contacts;
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.errorMessage = error as Error;
    }
  }
}
