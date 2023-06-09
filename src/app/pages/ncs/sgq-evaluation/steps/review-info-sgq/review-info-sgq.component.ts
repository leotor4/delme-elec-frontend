import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SgqService} from "../../sgq.service";
import {DialogService} from "primeng/dynamicdialog";
import {Contact} from "../../../../../models/contact.model";
import {DadosNCComponent} from "../../../../dialogs/dados-nc/dados-nc.component";

@Component({
  selector: 'app-review-info-sgq',
  templateUrl: './review-info-sgq.component.html',
  styleUrls: ['./review-info-sgq.component.css'],
  providers: [DialogService]
})
export class ReviewInfoSGQComponent implements OnInit {
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn unselected-btn";
  selectedClass = "btn selected-btn";
  editorStyle = {
    'width': '100%',
    'border': '0px',
  }
  contactsCopy: Contact[];
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor(public dialogService: DialogService, public sgqServ: SgqService) { }

  ngOnInit(): void {
    this.contactsCopy = this.sgqServ.nc.contacts.filter(val=>val.email! != "efraim@electrosonteleco.com")
  }

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }

  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

  details(nc: any) {
    const ref = this.dialogService.open(DadosNCComponent, {
      data: {nc: nc,
      },
      showHeader: false,
      width: '60vw',
    });
  }
}
