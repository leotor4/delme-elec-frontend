import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-checkpoint",
  templateUrl: "./checkpoint.component.html",
  styleUrls: ["./checkpoint.component.css"],
})
export class CheckpointComponent implements OnInit {
  selectedCity: any;
  fileName: string[] = [];
  fileNameAcoes: ["marcelo"];
  @Input("hasProduct") test: boolean;
  constructor() {}

  ngOnInit(): void {}

  clearFile() {
    this.fileName = [];
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileName.push(files[i].name);
      }
    }
  }
}
