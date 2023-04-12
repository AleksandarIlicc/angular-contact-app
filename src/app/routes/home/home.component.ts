import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/IContact';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public contacts: IContact[] = [] as IContact[];
  public contact: IContact = {} as IContact;
  public loading: boolean = true;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getContacts();
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
