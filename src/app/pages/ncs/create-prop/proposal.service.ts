import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionPlan } from 'src/app/models/action-plan';
import { Equipament } from 'src/app/models/equipament';
import { Instruction } from 'src/app/models/instruction';
import { Machine } from 'src/app/models/machine';
import { NbrNorm } from 'src/app/models/nbr-norm';
import { NonCompliance } from 'src/app/models/non-compliance';
import { Procedure } from 'src/app/models/procedure';
import { ProposalSolution } from 'src/app/models/proposal-solution';
import { RegulatoryNorm } from 'src/app/models/regulatory-norm';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  propSolution = new ProposalSolution()
  
  instructions:Instruction[]= []
  regulatorys:RegulatoryNorm[]= []
  procedures:Procedure[]= []
  nbrs:NbrNorm[]= []
  equipaments:Equipament[]= []
  machines:Machine[]= []
  users:User[] = []
  actions: ActionPlan[] = []

  apiUrl = "http://localhost:3333/proposal";

 

  constructor(private http: HttpClient) { }
  
 
  step2= {
    textAreas:  ["", "", "", "", "",""],
    selectedValue: ""
  }

  popular(){
    this.propSolution.first_why = this.step2.textAreas[0]
    this.propSolution.second_why = this.step2.textAreas[1]
    this.propSolution.third_why = this.step2.textAreas[2]
    this.propSolution.quarter_why = this.step2.textAreas[3]
    this.propSolution.fifth_why = this.step2.textAreas[4]
    this.propSolution.first_why_label = this.step2.textAreas[5]
    this.propSolution.root_cause = this.step2.selectedValue

    if(this.propSolution.machine)this.propSolution.machine_id = this.propSolution.machine.id
    if(this.propSolution.equipament)this.propSolution.equipament_id = this.propSolution.equipament.id
    if(this.propSolution.procedure)this.propSolution.procedure_id = this.propSolution.procedure.id
    if(this.propSolution.instruction)this.propSolution.instruction_id = this.propSolution.instruction.id
    if(this.propSolution.nbr)this.propSolution.nbr_id = this.propSolution.nbr.id
    if(this.propSolution.regulatory)this.propSolution.regulatory_id = this.propSolution.regulatory.id
  }

  post(){
    return this.http.post(this.apiUrl, this.propSolution)
  }

  put(){
    
    return this.http.put(this.apiUrl + "/" + this.propSolution.id, this.propSolution)
  }

  
  

}
