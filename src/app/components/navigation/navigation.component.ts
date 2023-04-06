import { Component, OnInit } from '@angular/core';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  icon = {
    faUser,
    faBell,
    faSearch,
  };

  constructor() {}

  ngOnInit(): void {}
}
