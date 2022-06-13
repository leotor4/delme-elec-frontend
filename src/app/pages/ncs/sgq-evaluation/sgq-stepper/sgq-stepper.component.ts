import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {NonComplianceService} from "../../../../_services/non-compliance.service";
import {SgqService} from "../sgq.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sgq-stepper',
  templateUrl: './sgq-stepper.component.html',
  styleUrls: ['./sgq-stepper.component.css']
})
export class SgqStepperComponent implements OnInit {

  items: MenuItem[];
  stepPosition: number = 0;
  lastStepLabel = "Avançar";
  constructor(public sgqSrv: SgqService, private messageService: MessageService, private route: ActivatedRoute,  private router:Router) {}

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return this.sgqSrv.avancarPasso1();
      case 1:
        return this.sgqSrv.avancarPasso2();
      default:
        return false;
    }
  }

  ngOnInit() {
    this.items = [
      { label: "Reincidências e evidências da NC" },
      { label: "Análises e notificações" },
      { label: "Revisar Informações" }
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep ? "Submeter Avaliação" : "Avançar";
    return labelName;
  }
  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep ? "bi bi-file-earmark-medical" : "pi pi-arrow-right";
    return iconClass;
  }
  isFirstStep() {
    return this.stepPosition === 0 ? true : false;
  }
  nextStep() {
    let id = parseInt(this.route.snapshot.paramMap.get('id')||"")


    this.sgqSrv.put().subscribe({
      next:(data:any )=> {
        this.messageService.add({
          severity: "success",
          summary: "Passo " + this.stepPosition + " salvo com sucesso.",
          life: 3000,
        });
        this.stepPosition >= this.items.length - 1?this.router.navigateByUrl('/ncs/about/' + id):this.stepPosition++



      },
      error:err =>{
        this.messageService.add({
          severity: "error",
          summary: "Houve um erro ao salvar passo " + this.stepPosition + "." ,
          life: 3000,
        });
      }
    })
  }
  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
    this.isFirstStep();
  }
  changeStepByPosition(event: any) {
    this.stepPosition = event;
  }

}
