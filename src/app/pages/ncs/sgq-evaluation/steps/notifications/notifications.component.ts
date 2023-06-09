import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Contact} from "../../../../../models/contact.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ContactsService} from "../../../create/steps/step3/contacts.service";
import {ProposalService} from "../../../create-prop/proposal.service";
import {ContactDialogComponent} from "../../../create/steps/step3/contact-dialog/contact-dialog.component";
import {SgqService} from "../../sgq.service";
import {TranslateService} from "@ngx-translate/core";

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
  contactsCopy: Contact[];

  constructor(
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private contactsSrvc: ContactsService,
      public dialogService: DialogService,
      public sgqServ: SgqService,
      public translate: TranslateService
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
      header: this.translate.instant('global.contacts.create'),
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
      header: this.translate.instant('global.contacts.edit'),
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
          this.translate.instant('global.contacts.message1') +
          contact.name +
          this.translate.instant('global.contacts.message2'),
      header: this.translate.instant('global.contacts.delete'),
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.sgqServ.nc.contacts=
            this.sgqServ.nc.contacts.filter(
                (val) => val.id !== contact.id
            );
        this.messageService.add({
          severity: "info",
          summary: this.translate.instant('global.contacts.successDel'),
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
          contact.name?.normalize('NFKD').replace(/[^\w]/g, '').toLowerCase().indexOf(query.toLowerCase()) == 0 ||
          contact.email?.normalize('NFKD').replace(/[^\w]/g, '').toLowerCase().indexOf(query.toLowerCase()) == 0
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
    this.contactsCopy = this.sgqServ.nc.contacts.filter(val=>val.email! != "efraim@electrosonteleco.com")
  }
}
