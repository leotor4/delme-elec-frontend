import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Attachment} from "../../../../models/attachment";
import {Cost} from "../../../../models/Cost";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit {
  id=0
  documents: Cost[] = [];
  addDocumentDialog: boolean=false;
  doc = new Cost();
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
    this.doc.attachment.name=""
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.doc.attachment.name = target.files[0].name;
      this.fileChosen=true
    }

  }


  save() {
    this.doc.id=this.id
    this.id++
    this.doc.value=parseInt(this.doc.value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    this.documents.push({...this.doc})
    this.doc = new Cost()
    this.addDocumentDialog=false
    this.fileChosen=false
  }
}
