import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, MessageService} from "primeng/api";
import {NonComplianceService} from "../../../../_services/non-compliance.service";
import {ProposalService} from '../proposal.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-create-prop-stepper',
  templateUrl: './create-prop-stepper.component.html',
  styleUrls: ['./create-prop-stepper.component.css']
})
export class CreatePropStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 0;
  lastStepLabel = "Avançar";
  constructor(private route: ActivatedRoute,
    private ncService:NonComplianceService,
    private messageService: MessageService,
    private router:Router,
    public propService:ProposalService,
              public translate: TranslateService) {}
  

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return this.propService.avancarPasso1Ishkawa();
      case 1:
        return false;
      case 2:
        return false;
      case 3:
        return false;
      default:
        return false;
    }
  }

  ngOnInit() {
    this.items = [
      { label: this.translate.instant("createProp.label1") },
      { label: this.translate.instant("createProp.label2") },
      { label: this.translate.instant("createProp.label3") },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    return isLastStep ? this.translate.instant("global.finish") : this.translate.instant("global.next");
  }

  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep ? "bi bi-file-earmark-plus" : "pi pi-arrow-right";
    return iconClass;
  }

  isFirstStep() {
    return this.stepPosition === 0;
  }

  nextStep() {
    

     let id = parseInt(this.route.snapshot.paramMap.get('id')||"")

    
    this.propService.popular()
    this.propService.put().subscribe({
       next:(data:any )=> {

        this.messageService.add({
          severity: "success",
          summary:  this.translate.instant("global.step") + (this.stepPosition + 1) + this.translate.instant("global.saved"),
          life: 3000,
        });
        this.stepPosition >= this.items.length - 1?this.router.navigateByUrl('/ncs/about/' + id):this.stepPosition++
      },
      error:err =>{
        this.messageService.add({
          severity: "error",
          summary: this.translate.instant("global.error") + (this.stepPosition + 1) + "." ,
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
