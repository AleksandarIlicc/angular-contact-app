import { Component, Input, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { faPencilAlt, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input() contactsList: IContact[] = [] as IContact[];
  icon = {
    faPencilAlt,
    faEye,
    faTimes,
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  // deleteContact(id: string) {
  //     this.router.navigate(['/']);
  // }
}
