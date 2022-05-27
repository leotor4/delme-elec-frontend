import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SgqService} from "../../sgq.service";

@Component({
  selector: 'app-review-info-sgq',
  templateUrl: './review-info-sgq.component.html',
  styleUrls: ['./review-info-sgq.component.css']
})
export class ReviewInfoSGQComponent implements OnInit {
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  editorStyle = {
    'width': '100%',
    'border': '0px',
  }
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }

  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

  details(nc: any) {
    
  }
}
