import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Place } from '../models/place';

@Injectable({
    providedIn: 'root'
})
export class PlaceResolver implements Resolve<Observable<Array<Place>>>
{
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<Place>> {
    const url = environment.apiURL + "place";
    
    return this.http.get<Place[]>(url);
  }
}