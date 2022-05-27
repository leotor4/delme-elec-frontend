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
    lackMaterials:string = "";
    excessMaterials:string= "";
    lowQualityMaterials:string= "";
    materialDescription:string= "";
    lackParameters:string= "";
    excessParameters:string= "";
    nonAchievementGoals:string= "";
    measurementDescription:string= "";
    instructionId:number;
    procedureId:number;
    nbrId:number;
    regulatoryId:number;
    methodDescription:string= "";
    runTraining:string= "";
    manPowerDescription:string= "";
    environmentDescription:string= "";
    machineDescription:string= "";
    equipamentId:number;
    machineId:number;
    effectDescription:string= "";
    firstWhy:string= "";
    secondWhy:string= "";
    thirdWhy:string= "";
    quarterWhy:string= "";
    fifthWhy:string= "";
    rootCause:string;
    nonComplianceId:number;
     machine = new Machine()
     actionPlan:ActionPlan[] = []
     contacts:Contact[] = []
  equipament = new Equipament()
  instruction = new Instruction()
  procedure = new Procedure()
  nbr = new NbrNorm()
  regulatory = new RegulatoryNorm()
}
