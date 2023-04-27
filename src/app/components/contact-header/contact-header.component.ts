import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.scss'],
})
export class ContactHeaderComponent implements OnInit {
  @Input() photo!: string | undefined;
  @Input() name!: string | undefined;
  noUserPhoto =
    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';

  constructor() {}

  ngOnInit(): void {}
}
