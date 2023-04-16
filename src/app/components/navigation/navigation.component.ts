import { Component, OnInit } from '@angular/core';
import { faUser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  icon = {
    faUser,
    faPlus,
    faSearch,
  };

  constructor() {}

  ngOnInit(): void {}
}
