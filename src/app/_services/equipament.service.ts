import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipament } from '../models/equipament';

@Injectable({
  providedIn: 'root'
})
export class EquipamentService {
  apiUrl = "http://localhost:3333/equipament";

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
