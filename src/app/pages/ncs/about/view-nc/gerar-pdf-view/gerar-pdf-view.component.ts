import { Component, OnInit } from '@angular/core';
import { Attachment } from 'src/app/models/attachment';
import { AboutService } from '../../about.service';

@Component({
  selector: "app-gerar-pdf-view",
  templateUrl: "./gerar-pdf-view.component.html",
  styleUrls: ["./gerar-pdf-view.component.css"],
})
export class GerarPdfViewComponent implements OnInit {
  constructor(public aboutService:AboutService) {}

  ngOnInit(): void {}

  returnTitle(): string {
    if (this.aboutService.nc.tipos_parceiro_item == "Interno")
      return "Dados do Setor";
    return "Razão Social";
  }

  returnFile(name: string) {
    let acoesFile: Attachment[] = [];
    this.aboutService.nc.attachments.forEach((element) => {
      if (element.path == name) {
        acoesFile.push(element);
      }
    });
    return acoesFile;
  }
}
