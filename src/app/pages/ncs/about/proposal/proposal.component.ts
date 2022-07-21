import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProposalService } from "../../create-prop/proposal.service";
import { AboutService } from "../about.service";

@Component({
  selector: "app-proposal",
  templateUrl: "./proposal.component.html",
  styleUrls: ["./proposal.component.css"],
})
export class ProposalComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public aboutService: AboutService,
    private proposalService: ProposalService
  ) {}
  id: number;
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
    return newDate.toLocaleString("pt-Br").split(" ")[0];
  }
  returnString(obj: any) {
    let str = "";
    if (obj) str += obj.name ?? "";
    return str;
  }

  getContacts() {
    return this.aboutService.nc.contacts.filter(
      (val) => val.email! != "efraim@electrosonteleco.com"
    );
  }
}
