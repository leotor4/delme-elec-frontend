import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AboutService } from "../about.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-proposal",
  templateUrl: "./proposal.component.html",
  styleUrls: ["./proposal.component.css"],
})
export class ProposalComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public aboutService: AboutService
  ) {}
  id: number;
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  editorStyle = {
    height: "120px",
    width: "260px",
    border: "2px solid #333333",
    "border-radius": "5px",
  };

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id") || "");
   
  }

  goPlaces() {
    this.router.navigate(["/", "ncs", "createProp", this.id]);
  }

  dataParse(date: any) {
    let newDate = new Date(date);
    let formatedDate = newDate.toLocaleString("pt-Br").split(" ")[0];
    return formatedDate;
  }
  returnString(obj: any) {
    let str = "";
    if (obj?.code) str += obj.code + " ";
    if (obj?.description) str += obj.description + " ";
    if (obj?.rev) str += obj.rev + " ";
    return str;
  }
}
