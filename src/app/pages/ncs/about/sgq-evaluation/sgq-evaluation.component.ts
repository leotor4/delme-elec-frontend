import { Component, OnInit } from '@angular/core';
import {AboutService} from "../about.service";
import {ActivatedRoute} from "@angular/router";
import {NcInfoComponent} from "../../sgq-evaluation/steps/reoccurrence/nc-info/nc-info.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-sgq-evaluation',
  templateUrl: './sgq-evaluation.component.html',
  styleUrls: ['./sgq-evaluation.component.css'],
  providers: [DialogService]
})
export class SGQEvaluationComponent implements OnInit {
  id: number;
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  editorStyle = {
    'width': '100%',
    'border': '0px',
    'font-size': '20px'
  }
  constructor(public dialogService: DialogService, private route: ActivatedRoute, public aboutSrv: AboutService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }
  details(nc: any) {
    const ref = this.dialogService.open(NcInfoComponent, {
      data: {nc: nc,
      },
      showHeader: false,
      width: '60vw',
    });
  }
  getContacts(){
    return this.aboutSrv.nc.contacts.filter(val=>val.email! != "efraim@electrosonteleco.com")
  }


}
