import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProposalService} from "../../../proposal.service";

@Component({
  selector: 'app-ishikawa-dialog',
  templateUrl: './ishikawa-dialog.component.html',
  styleUrls: ['./ishikawa-dialog.component.css']
})
export class IshikawaDialogComponent implements OnInit {
  stepPosition: number = 1;

  machines:any[]
  equipaments:any[]
  instructions:any[]
  procedures:any[]
  nbrs:any[]
  regulatoryNorms:any[]
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public propService: ProposalService,
  ) { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log(this.propService.propSolution.material_description)
    
  }

  returnTextButton():string{
    if (this.isLastStep())
      return "Fechar"

    return "Avançar"
  }

  search(event:any,type:string){
    var filtro = event.query;
    
    switch(type){
      case 'machine':
        this.machines = [];
         this.propService.machines.forEach(element =>{
      if(element.name.toLowerCase().includes(filtro.toLowerCase())){
        this.machines.push(element)
      }
     
    })
     break;
    case 'equipament':
      this.equipaments = [];
         this.propService.equipaments.forEach(element =>{
      if(element.name.toLowerCase().includes(filtro.toLowerCase())){
        this.equipaments.push(element)
      }
    })
      break;
      case 'instruction':
      this.instructions = [];
         this.propService.instructions.forEach(element =>{
      if(element.description.toLowerCase().includes(filtro.toLowerCase())){
        this.instructions.push(element)
      }
    })
      break;

      case 'procedure':
      this.procedures = [];
      console.log(this.propService.procedures)
         this.propService.procedures.forEach(element =>{
      if(element.description?.toLowerCase().includes(filtro.toLowerCase())||element.code?.toLowerCase().includes(filtro.toLowerCase())){
        this.procedures.push(element)
      }
    })
      break;

      case 'nbr':
      this.nbrs= [];
         this.propService.nbrs.forEach(element =>{
      if(element.description.toLowerCase().includes(filtro.toLowerCase())){
        this.nbrs.push(element)
      }
    })
      break;

      case 'regulatory':
      this.regulatoryNorms = [];
         this.propService.regulatorys.forEach(element =>{
      if(element.description.toLowerCase().includes(filtro.toLowerCase())){
        this.regulatoryNorms.push(element)
      }
    })
      break;
    }
    
   
  }

 

  ngOnInit(): void {
    this.stepPosition = this.config.data.page
  }

  isFirstStep() {
    return this.stepPosition === 1;
  }

  isLastStep() {
    return this.stepPosition === 7;
  }

  nextStep() {
    if (this.stepPosition >= 7) this.ref.close();
    this.stepPosition++;
    this.isLastStep()
  }

  backStep() {
    if (this.stepPosition <= 1) return;
    this.stepPosition--;
    this.isFirstStep();
  }

  close() {
    
    this.ref.close();
  }
}
