import { Injectable } from '@angular/core';
import {Contact} from "../../../../models/contact.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Closing} from "../../../../models/closing";

@Injectable({
  providedIn: 'root'
})
export class ClosingService {
  apiUrl = "http://localhost:3333/closing/";
  constructor(private http: HttpClient) { }

  post(data: Closing): Observable<any> {
    return this.http.post<Closing>(this.apiUrl, data);
  }
}
