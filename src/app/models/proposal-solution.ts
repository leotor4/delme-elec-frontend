import { ActionPlan } from "./action-plan";
import { Contact } from "./contact.model";
import { Equipament } from "./equipament";
import { Instruction } from "./instruction";
import { Machine } from "./machine";
import { NbrNorm } from "./nbr-norm";
import { Procedure } from "./procedure";
import { RegulatoryNorm } from "./regulatory-norm";

export class ProposalSolution {
    id:number;
    lack_materials:string = "";
    excess_materials:string= "";
    low_quality_materials:string= "";
    material_description:string= "";
    lack_parameters:string= "";
    excess_parameters:string= "";
    non_achievement_goals:string= "";
    measurement_description:string= "";
    instruction_id:number;
    procedure_id:number;
    nbr_id:number;
    regulatory_id:number;
    method_description:string= "";
    run_training:string= "";
    man_power_description:string= "";
    environment_description:string= "";
    machine_description:string= "";
    equipament_id:number;
    machine_id:number;
    effect_description:string= "";
    first_why_label:string = "";
    first_why:string= "";
    second_why:string= "";
    third_why:string= "";
    quarter_why:string= "";
    fifth_why:string= "";
    root_cause:string;
    non_compliance_id:number;
     machine = new Machine()
     actionPlans:ActionPlan[] = []
     contacts:Contact[] = []
  equipament = new Equipament()
  instruction = new Instruction()
  procedure = new Procedure()
  nbr = new NbrNorm()
  regulatory = new RegulatoryNorm()
}
