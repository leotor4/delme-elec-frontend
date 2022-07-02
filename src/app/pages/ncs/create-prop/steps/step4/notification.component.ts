import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Contact } from "../../../../../models/contact.model";
import { DialogService } from "primeng/dynamicdialog";

import {ContactsService} from "../../../create/steps/step3/contacts.service";
import {ContactDialogComponent} from "../../../create/steps/step3/contact-dialog/contact-dialog.component";
import {ProposalService} from "../../proposal.service";
import {AboutService} from "../../../about/about.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
  providers: [DialogService],
})
export class NotificationComponent implements OnInit {
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
    public propService: ProposalService,
    public aboutSrvc: AboutService,
    public translate: TranslateService
  ) {}


  ngOnInit(): void {
    this.getContacts()
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
        this.propService.propSolution.contacts.push(contact);
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
        let index = this.propService.propSolution.contacts.findIndex((item) => {
          return item.id == contact.id;
        });
        this.propService.propSolution.contacts[index] = contact;
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
        this.propService.propSolution.contacts =
          this.propService.propSolution.contacts.filter(
            (val) => val.id !== contact.id
          );
        this.propService.ncProp.contacts =
            this.propService.ncProp.contacts.filter(
                (val) => val.id !== contact.id
            );
        this.contactsCopy =
            this.contactsCopy.filter(
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
        this.propService.propSolution.contacts.indexOf(val) < 0 &&
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
    this.contactsCopy.push(contact);
    this.selectedContact = "";
  }

  uncheckContact(contact: Contact) {
    this.selectedContacts = this.selectedContacts.filter(
      (val) => val.id !== contact.id
    );
  }

  saveSelection() {
    this.addContactsDialog = false;
    this.propService.propSolution.contacts =
      this.propService.propSolution.contacts.concat(this.selectedContacts);
    this.selectedContacts = [];
  }

  getContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
      this.allContacts = data.contact
      this.propService.propSolution.contacts = this.propService.ncProp.contacts
      this.contactsCopy = this.propService.propSolution.contacts.filter(val=>val.email! != "efraim@electrosonteleco.com")
    });
  }
}
