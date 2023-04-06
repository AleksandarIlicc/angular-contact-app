import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contacts: IContact[] = [];

  constructor(private _contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this._contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }
}
