import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ImportService {
  API_URL = environment.apiURL;
  constructor(private http: HttpClient) {}

  post(json: any, type: string): Observable<any> {
    return this.http.post<any>(this.API_URL + type, JSON.parse(json));
  }

  postUpdateTime(): Observable<any> {
    return this.http.post<any>(this.API_URL + "updateDate", {
      update_time: new Date().toISOString(),
    });
  }
}
