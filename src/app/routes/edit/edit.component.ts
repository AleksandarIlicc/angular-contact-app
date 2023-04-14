import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/interfaces/IContact';
import { IGroup } from 'src/app/interfaces/IGroup';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  public contactID: string | null = null;
  public singleContact: IContact = {} as IContact;
  public contactGroups: IGroup[] = [] as IGroup[];
  public loading: boolean = true;
  public errorMessage!: Error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactID = param.get('id');
    });
    if (this.contactID) {
      this.getSingleContact(this.contactID);
    }
    this.getGroups();
  }

  async getSingleContact(contactID: string) {
    const documentRef = doc(this.firestore, 'contacts/' + contactID);
    try {
      this.loading = true;
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        this.singleContact = documentSnapshot.data() as IContact;
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.errorMessage = error as Error;
    }
  }

  async getGroups() {
    const documentRef = collection(this.firestore, 'groups');
    const querySnapshot = await getDocs(documentRef);

    this.contactGroups = querySnapshot.docs.map((item) => {
      return { id: item.id, ...item.data() } as IGroup;
    });
  }

  async editContact() {
    const documentRef = doc(this.firestore, 'contacts/' + this.contactID);
    try {
      await updateDoc(documentRef, { ...this.singleContact });
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = error as Error;
    }
  }
}
