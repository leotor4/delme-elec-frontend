import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { Contact } from "../../../../../../models/contact.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-contact-dialog",
  templateUrl: "./contact-dialog.component.html",
  styleUrls: ["./contact-dialog.component.css"],
})
export class ContactDialogComponent implements OnInit {
  contact: Contact = {};
  isEdit: boolean;

  constructor(
    private contactsSrvc: ContactsService,
    private nonComplianceService: NonComplianceService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contact = this.config.data.contact;
    this.isEdit = this.config.data.isEdit;
  }

  saveContact() {
    if (this.isEdit) {
      this.contactsSrvc.update(this.contact).subscribe(
        (data) => {
          this.messageService.add({
            severity: "info",
            summary: "Contato editado com sucesso",
            life: 3000,
          });
          this.getContacts();
          this.ref.close(this.contact);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Campos inválidos",
            life: 3000,
          });
          this.ref.close();
        }
      );
    } else {
      this.contactsSrvc.post(this.contact).subscribe(
        (data) => {
          this.messageService.add({
            severity: "info",
            summary: "Contato criado com sucesso",
            life: 3000,
          });
          this.getContacts();
          this.ref.close(this.contact);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Campos inválidos",
            life: 3000,
          });
          this.ref.close();
        }
      );
    }
  }

  cancel() {
    this.ref.close();
  }

  getContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
      this.nonComplianceService.allContacts = data.contact;
      this.nonComplianceService.nc.contacts =
        this.nonComplianceService.allContacts.filter((val) => val.id! <= 4);
    });
  }
}
