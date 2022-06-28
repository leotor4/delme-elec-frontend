import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionPlan } from '../models/action-plan';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionPlanService {
 apiUrl = environment.apiURL + "actionPlan";
  constructor(private http: HttpClient) { }

  post(data: ActionPlan): Observable<ActionPlan> {
    return this.http.post<ActionPlan>(this.apiUrl, data);
  }
}
