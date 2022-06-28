import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipament } from '../models/equipament';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipamentService {
  apiUrl = environment.apiURL + "equipament";

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
