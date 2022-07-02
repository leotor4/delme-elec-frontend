import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Cost } from "../../../../models/Cost";
import { AboutService } from "../about.service";
import { TokenStorageService } from "../../../../_services/token-storage.service";
import { VisualizarDocumentoDialogComponent } from "../../../dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component";
import { DialogService } from "primeng/dynamicdialog";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-costs",
  templateUrl: "./costs.component.html",
  styleUrls: ["./costs.component.css"],
  providers: [DialogService],
})
export class CostsComponent implements OnInit {
  addDocumentDialog: boolean = false;
  doc = new Cost();
  fileChosen: boolean;
  files: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public aboutSrvc: AboutService,
    private tokenSrvc: TokenStorageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    
    console.log(this.aboutSrvc.nc?.costs);
  }

  deleteAction(doc: any) {
    this.confirmationService.confirm({
      message:
        "Você tem certeza que quer excluir o documento " +
        doc.file_name +
        " da lista?",
      header: "Excluir Documento",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.aboutSrvc.deleteCost(doc.id).subscribe((value) => {
          this.aboutSrvc.getNC(this.aboutSrvc!.nc!.id!);
        });
        this.messageService.add({
          severity: "info",
          summary: "Documento removido com sucesso",
          life: 3000,
        });
      },
    });
  }

  clearFile() {
    this.fileChosen = false;
    this.files = [];
  }

  haveFiles() {
    if (this.files){
       if (this.files.length == 0) return false;
       return true;
    } 
    return false;
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.files = target.files;
      this.fileChosen = true;
    }

    console.log(this.files);
  }

  format(text:string){
    return parseFloat(text).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  save() {
    if(!this.doc.value){
      this.doc.value = "0";
    }
    this.doc.nonCompliance_id = this.aboutSrvc!.nc!.id!;
    this.doc.userId = this.tokenSrvc.getUser().id;
    

    this.aboutSrvc.postCost(this.doc, this.files).subscribe(
      (data) => {
        this.aboutSrvc.getNC(this.aboutSrvc!.nc!.id!);
        this.messageService.add({
          severity: "success",
          summary: "Documento adicionado com sucesso",
          life: 3000,
        });
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: err.name,
          life: 3000,
        });
      }
    );
    this.doc = new Cost();
    this.addDocumentDialog = false;
    this.fileChosen = false;
    this.files = null;
  }

  parseDate(date: string) {
    let d = new Date(Date.parse(date));
    return d.toLocaleDateString();
  }

  visualizarDocumento(id: number, type: string) {
    this.aboutSrvc.viewFile(id).subscribe({
      next: (data) => {
        const ref = this.dialogService.open(
          VisualizarDocumentoDialogComponent,
          {
            data: {
              base64: data.data,
              type: type,
            },
            header: "Visualizar Documento",
            width: "1000px",
          }
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Houve um problema ao visualizar arquivo.",
          life: 3000,
        });
      },
    });
  }

  clearById(name: string) {
    let aux = this.files;
    this.files = [];
    for (var i = 0; i < aux.length; i++) {
      if (!(aux[i].name == name)) {
      this.files.push(aux[i]);
      }
    }
  }
  getUrl(id: any) {
    return environment.apiURL + "costs/files/download/" + id;
  }
}
