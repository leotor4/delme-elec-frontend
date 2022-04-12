import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Contact} from "../../../../../models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  apiUrl = "http://localhost:3333/contact/";

  constructor(private http: HttpClient) {}

  post(data: Contact): Observable<any> {
    return this.http.post<Contact>(this.apiUrl, data);
  }
  update(data: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.apiUrl+data.id, data);
  }

  findByID(id:string): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl+id);
  }
  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
