import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public contacts: IContact[] = [] as IContact[];
  public contact: IContact = {} as IContact;
  public loading: boolean = true;

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.getContacts();
    // PROBLEM - When I click on single contact and I try to get back on Home page data from
    // the Firestore don't load, so there are two solutions to fix this problem

    // SOLUTION ONE - we subscribed to the router.events observable and filtered for NavigationEnd
    // event. The NavigationEnd event is triggered when navigation ends and you can execute any
    // logic related to that event inside the IF block

    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.getContacts();
    //   });

    // SOLUTION TWO - we subscribed to the NavigationEnd event of the Router and then called
    // the method getContacts to reload data when navigation ends. The filter operator is used to
    // filtered out any other types of navigation events

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContacts();
      }
    });
  }

  async getContacts() {
    const collectionRef = collection(this.firestore, 'contacts');

    try {
      this.loading = true;
      const querySnapshot = await getDocs(collectionRef);
      this.contacts = querySnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() } as IContact;
      });
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }
}
