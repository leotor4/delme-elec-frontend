import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Attachment} from "../../../../models/attachment";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit {
  id=0
  documents: any[] = [];
  addDocumentDialog: boolean=false;
  doc = {id: 0, name: "", date: "", annexBy: "test", price: ""};
  fileChosen: boolean;

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

  clearFile() {
    this.fileChosen=false
    this.doc.name=""
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.doc.name = target.files[0].name;
      this.fileChosen=true
    }

  }


  save() {
    this.doc.id=this.id
    this.id++
    let date = new Date(Date.now());
    this.doc.date = date.toLocaleDateString()
    this.doc.price=parseInt(this.doc.price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    this.documents.push({...this.doc})
    this.doc = {id: 0, name: "", date: "", annexBy: "test", price: ""}
    this.addDocumentDialog=false
    this.fileChosen=false
  }
}
