import { Component, Input, OnInit } from '@angular/core';
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
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact: IContact = {} as IContact;

  public icons = {
    faEnvelope,
    faPhoneAlt,
    faLocationArrow,
    faBuilding,
    faUserFriends,
    faSuitcase,
    faPencilAlt,
    faEye,
    faTimes,
  };

  constructor() {}

  ngOnInit(): void {}
}
