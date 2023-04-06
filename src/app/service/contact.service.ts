import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../interfaces/IContact';
import { IGroup } from '../interfaces/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  urlAddress = 'http://localhost:9000';
  errorMessage: string | undefined;

  constructor(private _http: HttpClient) {}

  public getContacts(): Observable<IContact[]> {
    const url = `${this.urlAddress}/contacts`;
    return this._http.get<IContact[]>(url).pipe(catchError(this.handleError));
  }

  public getSingleContact(id: string | null): Observable<IContact> {
    const url = `${this.urlAddress}/contacts/${id}`;
    return this._http.get<IContact>(url).pipe(catchError(this.handleError));
  }

  public editContact(
    id: string | null,
    contact: IContact
  ): Observable<IContact> {
    const url = `${this.urlAddress}/contacts/${id}`;

    return this._http
    .put<IContact>(url, contact)
    .pipe(catchError(this.handleError));
  }
  
  public deleteContact(id: string): Observable<{}> {
    const url = `${this.urlAddress}/contacts/${id}`;
    return this._http.delete<{}>(url).pipe(catchError(this.handleError))
  }

  public getGroups(): Observable<IGroup[]> {
    const url = `${this.urlAddress}/groups`;
    return this._http.get<IGroup[]>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorMessage = `'An error occurred:', ${error.error}`;
    } else {
      this.errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    this.errorMessage = 'Something bad happened; please try again later.';
    return throwError(() => new Error(this.errorMessage));
  }
}
