import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Instruction } from "../models/instruction";

@Injectable({
  providedIn: "root",
})
export class InstructionsService {
  apiUrl = environment.apiURL + "instructions";
  constructor(private http: HttpClient) {}

  post(instruction: Instruction, file: any) {
    let formData = new FormData();
    formData.append("data", JSON.stringify(instruction));
    formData.append("file", file);
    return this.http.post(this.apiUrl, formData);
  }

  get(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(this.apiUrl);
  }

  downloadFile(id:number){
    return this.http.get<any>(this.apiUrl + "/files/"+ id);
  }
}
