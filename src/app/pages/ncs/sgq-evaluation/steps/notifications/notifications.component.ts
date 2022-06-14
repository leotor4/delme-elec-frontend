import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Contact} from "../../../../../models/contact.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ContactsService} from "../../../create/steps/step3/contacts.service";
import {ProposalService} from "../../../create-prop/proposal.service";
import {ContactDialogComponent} from "../../../create/steps/step3/contact-dialog/contact-dialog.component";
import {SgqService} from "../../sgq.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [DialogService]
})
export class NotificationsComponent implements OnInit {
  addContactsDialog: boolean;
  selectedContacts: Contact[] = [];
  selectedContact: String;
  results: Contact[];
  private allContacts: Contact[];

  constructor(
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private contactsSrvc: ContactsService,
      public dialogService: DialogService,
      public sgqServ: SgqService
  ) {}

  ngOnDestroy(): void {
    //salva dados no service
  }

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
        this.sgqServ.nc.contacts.push(contact);
        this.allContacts.push(contact);
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
        let index = this.sgqServ.nc.contacts.findIndex((item) => {
          return item.id == contact.id;
        });
        this.sgqServ.nc.contacts[index] = contact;
        index = this.allContacts.findIndex((item) => {
          return item.id == contact.id;
        });
        this.allContacts[index] = contact;
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
        this.sgqServ.nc.contacts=
            this.sgqServ.nc.contacts.filter(
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
    let contacts = this.allContacts.filter(
        (val) =>
            this.sgqServ.nc.contacts.indexOf(val) < 0 &&
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
    this.sgqServ.nc.contacts =
        this.sgqServ.nc.contacts.concat(this.selectedContacts);
    this.selectedContacts = [];
  }

  getContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
      this.allContacts = data.contact;
    });
  }
}
