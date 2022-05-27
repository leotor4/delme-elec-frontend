import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionPlan } from '../models/action-plan';

@Injectable({
  providedIn: 'root'
})
export class ActionPlanService {
 apiUrl = "http://localhost:3333/actionPlan";
  constructor(private http: HttpClient) { }

  post(data: ActionPlan): Observable<ActionPlan> {
    return this.http.post<ActionPlan>(this.apiUrl, data);
  }
}
