import { Component, Input, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { faPencilAlt, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input() contactsList: IContact[] = [];
  icon = {
    faPencilAlt,
    faEye,
    faTimes,
  };

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {}

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
