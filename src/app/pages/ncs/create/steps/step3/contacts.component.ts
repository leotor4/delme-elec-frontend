import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Contact } from "../../../../../models/contact.model";
import { ContactsService } from "./contacts.service";
import { DialogService } from "primeng/dynamicdialog";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import {TokenStorageService} from "../../../../../_services/token-storage.service";
import { User } from "src/app/models/user.model";
import {UserService} from "../../../../../_services/user.service";

@Component({
  selector: "app-step3",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"],
  providers: [DialogService],
})
export class ContactsComponent implements OnInit{
  addContactsDialog: boolean;
  selectedContacts: Contact[] = [];
  selectedContact: String;
  results: Contact[];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public nonComplianceService: NonComplianceService,
    public tokenServ: TokenStorageService,
    public userServ: UserService
  ) {}


  ngOnInit(): void {
    this.getContacts();
  }

  createNewContact() {
    this.addContactsDialog = false;
    const ref = this.dialogService.open(ContactDialogComponent, {
      data: {
        contact: {},
        isEdit: false,
      },
      header: "Criar Contato",
      width: "425px",
    });
    ref.onClose.subscribe((contact: Contact) => {
      if (contact) {
        this.nonComplianceService.nc.contacts.push(contact);
        this.nonComplianceService.allContacts.push(contact);
      }
    });
  }

  editContact(contact: Contact) {
    const ref = this.dialogService.open(ContactDialogComponent, {
      data: {
        contact: { ...contact },
        isEdit: true,
      },
      header: "Editar Contato",
      width: "425px",
    });
    ref.onClose.subscribe((contact: Contact) => {
      if (contact) {
        let index = this.nonComplianceService.nc.contacts.findIndex((item) => {
          return item.id == contact.id;
        });
        this.nonComplianceService.nc.contacts[index] = contact;
        index = this.nonComplianceService.allContacts.findIndex((item) => {
          return item.id == contact.id;
        });
        this.nonComplianceService.allContacts[index] = contact;
      }
    });
  }

  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message:
        "Você tem certeza que quer excluir o contato " +
        contact.name +
        " da lista?",
      header: "Excluir Contato",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.nonComplianceService.nc.contacts =
          this.nonComplianceService.nc.contacts.filter(
            (val) => val.id !== contact.id
          );
        this.messageService.add({
          severity: "info",
          summary: "Contato Removido com sucesso",
          life: 3000,
        });
      },
    });
  }

  showAddContacts() {
    this.selectedContacts = [];
    this.addContactsDialog = true;
  }

  hideAddContacts() {
    this.addContactsDialog = false;
  }

  search(event: any) {
    let filtered: Contact[] = [];
    let query = event.query;
    let contacts = this.nonComplianceService.allContacts.filter(
      (val) =>
        this.nonComplianceService.nc.contacts.indexOf(val) < 0 &&
        this.selectedContacts.indexOf(val) < 0
    );
    contacts.forEach((contact) => {
      if (
        contact.name?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        contact.email?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(contact);
      }
    });
    this.results = filtered;
  }

  checkContact(contact: Contact) {
    this.selectedContacts.push(contact);
    this.selectedContact = "";
  }

  uncheckContact(contact: Contact) {
    this.selectedContacts = this.selectedContacts.filter(
      (val) => val.id !== contact.id
    );
  }

  saveSelection() {
    this.addContactsDialog = false;
    this.nonComplianceService.nc.contacts =
      this.nonComplianceService.nc.contacts.concat(this.selectedContacts);
    this.selectedContacts = [];
  }

  getContacts() {
    this.userServ.getAll().subscribe((data:any)=>{
      this.nonComplianceService.allContacts = data.users;
      this.nonComplianceService.nc.contacts =
          this.nonComplianceService.allContacts.filter((val) => val.email! === "cafareli@electrosonteleco.com.br"
              || val.email! === this.nonComplianceService.nc.emissor?.sector?.responsible_email
              || val.email! === this.nonComplianceService.nc.sector?.responsible_email
              || val.email! === "manuela.starowsta@electrosonteleco.com.br");
      this.nonComplianceService.nc.contacts.push(this.tokenServ.getUser())

    })
  }
}
