import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/interfaces/IContact';
import { IGroup } from 'src/app/interfaces/IGroup';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public contactID: string | null = null;
  public singleContact: IContact = {} as IContact;
  public contactGroups: IGroup[] = [] as IGroup[];
  public loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactID = param.get('id');
    });

    if (this.contactID) {
      this.loading = true;
      this.contactService.getSingleContact(this.contactID).subscribe((data) => {
        this.singleContact = data;
        this.loading = false;

        this.contactService.getGroups().subscribe((data) => {
          this.contactGroups = data;
        });
      });
    }
  }

  public editContact() {
    this.contactService
      .editContact(this.contactID, this.singleContact)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
