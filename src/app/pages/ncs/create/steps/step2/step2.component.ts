import { Component, OnInit } from "@angular/core";
import { UpdateDate } from "src/app/models/update-date";
import { UpdateDateService } from "src/app/_services/update-date.service";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  selectedValue: string = "val1";
  updates: UpdateDate;
  constructor(public updateService: UpdateDateService) {}

  returnUpdateTime() {
    if (this.updates) {
      let dateAtt = new Date(this.updates.update_time);
      let dateNow = new Date();
      var Difference_In_Time = dateNow.getTime() - dateAtt.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      var round_day = Math.floor(Difference_In_Days);
      if (round_day < 1) {
        return "Hoje";
      } else {
        return "Há " + round_day + " dias.";
      }
    }
    return "";
  }

  ngOnInit(): void {
    this.updateService.get().subscribe((data: any) => {
      this.updates = data.Updatedate[0];
    });
  }
}
