import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/interfaces/IContact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss'],
})
export class SingleContactComponent implements OnInit {
  public contactID: string | null = null;
  public singleContact: IContact = {} as IContact;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactID = param.get('id');
    });

    if (this.contactID) {
      this.contactService.getSingleContact(this.contactID).subscribe((data) => {
        this.singleContact = data;
        console.log(data);
      });
    }
  }
}
