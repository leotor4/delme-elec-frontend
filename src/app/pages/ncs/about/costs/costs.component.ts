import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit {
  id:number
  documents: any[] = [
      {
        "id": "0",
        "name": "NF-XXX",
        "date": "03/01/1978",
        "annexBy": "Dotty Shama",
        "price": "R$489.62"
      },
      {
        "id": "1",
        "name": "NF-XXX",
        "date": "18/05/1987",
        "annexBy": "Elise Leary",
        "price": "R$608.63"
      },
      {
        "id": "2",
        "name": "NF-XXX",
        "date": "31/05/2021",
        "annexBy": "Rani Hamil",
        "price": "R$908.81"
      },
      {
        "id": "3",
        "name": "NF-XXX",
        "date": "12/11/1985",
        "annexBy": "Courtnay Roscoe",
        "price": "R$413.68"
      },
      {
        "id": "4",
        "name": "NF-XXX",
        "date": "30/08/1951",
        "annexBy": "Adore Fax",
        "price": "R$156.57"
      },
  ];
  addDocumentDialog: boolean=false;
  doc = {
    "id": "",
    "name": "",
    "date": "",
    "annexBy": "",
    "price": ""
  };

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  deleteAction(doc:any){
    this.confirmationService.confirm({
      message:
          "Você tem certeza que quer excluir o documento " +
          doc.name+
          " da lista?",
      header: "Excluir Documento",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.documents=
            this.documents.filter(
                (val) => val.id !== doc.id
            );
        this.messageService.add({
          severity: "info",
          summary: "Documento removida com sucesso",
          life: 3000,
        });
      },
    });
  }

}
