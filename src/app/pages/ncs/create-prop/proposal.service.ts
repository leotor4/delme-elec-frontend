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
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {Sector} from "../../../models/sector";
import {SectorService} from "../../../_services/sector.service";


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
  sectors: Sector[]


  apiUrl = "http://localhost:3333/proposal";
  ncProp:NonCompliance;

 

  constructor(private ncsService : NonComplianceService, private http: HttpClient, public sectorService: SectorService,) { }
  
 
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

  
  
  avancarPasso1Ishkawa(): boolean {

    
    return !(
      this.propSolution.effect_description
      && this.checkOneBoxIshikawa()
      && this.checkWhies()
      // && this.propSolution.second_why
      // && this.propSolution.third_why
      // && this.propSolution.root_cause
      
    )
  }

  checkWhies():boolean {
    if (
      this.step2.textAreas[0]
      && this.step2.textAreas[1]
      && this.step2.textAreas[2]
      && this.step2.textAreas[5]
      && this.step2.selectedValue
    ) return true
    else return false
    
  }

  checkOneBoxIshikawa(): boolean {
    var return_box_1: boolean = this.propSolution.low_quality_materials != ''
      || this.propSolution.excess_materials != ''
      || this.propSolution.lack_materials != ''
      || (
        this.propSolution.material_description != ''
        && this.propSolution.material_description != null
      )

      var return_box_2: boolean = this.propSolution.non_achievement_goals != ''
      || this.propSolution.excess_parameters != ''
      || this.propSolution.lack_parameters != ''
      || (
        this.propSolution.measurement_description != ''
        && this.propSolution.measurement_description != null
      )


      var return_box_3: boolean = this.propSolution.method_description != ''
        && this.propSolution.method_description != null
      

      var return_box_4: boolean = this.propSolution.run_training != ''
      || (
        this.propSolution.man_power_description != ''
        && this.propSolution.man_power_description != null
      )

      var return_box_5: boolean = this.propSolution.environment_description != ''
      && this.propSolution.environment_description != null

      var return_box_6: boolean = this.propSolution.machine_description != ''
      && this.propSolution.machine_description != null

      var umaBoxPreenchida = return_box_1 || return_box_2 || return_box_3 || return_box_4 || return_box_5 || return_box_6
      return umaBoxPreenchida
     
     
  }
  getSectors(){
    this.sectorService.get().subscribe((data: any) => {
      this.sectors = data.sectors;
    });
  }
}


