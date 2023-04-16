import { Component } from '@angular/core';
import { faUser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  icon = {
    faUser,
    faPlus,
    faSearch,
  };

  constructor() {}
}
