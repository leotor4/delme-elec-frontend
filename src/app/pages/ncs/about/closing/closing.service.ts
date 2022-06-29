import { Injectable } from '@angular/core';
import {Contact} from "../../../../models/contact.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Closing} from "../../../../models/closing";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClosingService {
  apiUrl = environment.apiURL  + "closing/";
  constructor(private http: HttpClient) { }

  post(data: Closing): Observable<any> {
    return this.http.post<Closing>(this.apiUrl, data);
  }
}
