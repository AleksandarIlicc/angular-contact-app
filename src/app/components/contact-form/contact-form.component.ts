import { Component, Input, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { IGroup } from 'src/app/interfaces/IGroup';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: IContact = {} as IContact;
  @Input() groups: IGroup[] = [] as IGroup[];

  constructor() {}

  ngOnInit(): void {}
}
