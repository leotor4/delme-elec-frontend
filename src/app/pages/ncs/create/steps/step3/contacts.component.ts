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
    private contactsSrvc: ContactsService,
    public dialogService: DialogService,
    public nonComplianceService: NonComplianceService,
    public tokenServ: TokenStorageService
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
    let query = event.query.normalize('NFKD').replace(/[^\w]/g, '');
    let contacts = this.nonComplianceService.allContacts.filter(
      (val) =>
        this.nonComplianceService.nc.contacts.indexOf(val) <= 0 &&
        this.selectedContacts.indexOf(val) < 0
    );
    const regex = new RegExp(`^${query}`, "i");
    this.results = contacts.sort().filter((v) => regex.test(<string>v.name));
    this.results = this.results.concat(contacts.sort().filter((v) => regex.test(<string>v.email)));
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
    let afectedsector = this.nonComplianceService.sectors.find(i => i.name === this.nonComplianceService.nc.tipos_local_item)
    this.contactsSrvc.get().subscribe((data: any) => {
      this.nonComplianceService.allContacts = data.contact;
        let user = this.tokenServ.getUser()
        this.nonComplianceService.nc.contacts =
            this.nonComplianceService.allContacts.filter((val) => val.email! === "efraim@electrosonteleco.com"
                || val.email! === afectedsector!.responsible_email
                || val.email! === this.nonComplianceService.nc.emissor?.sector?.responsible_email
                || val.email! === "manuela.starowsta@electrosonteleco.com.br"|| val.email! === user.email || val.email! === this.nonComplianceService.nc.customer?.responsible_email || val.email! === this.nonComplianceService.nc.provider?.responsible_email || val.email! === this.nonComplianceService.nc?.partner?.responsible_email);

        let userContact = this.nonComplianceService.allContacts.filter((val) => val.email === user.email);
        if (userContact.length <= 0) {
          let contact = new Contact()
          contact.email = user.email
          contact.name = user.username
          contact.type = this.nonComplianceService.nc.emissor?.sector?.name
          this.contactsSrvc.post(contact).subscribe(
              (data) => {
                this.nonComplianceService.allContacts.push(data.contact)
                this.nonComplianceService.nc.contacts.push(data.contact)
              }
          )

        }
        if (!this.nonComplianceService.allContacts.some(e => e.email === 'efraim@electrosonteleco.com')) {
          let contact = new Contact()
          contact.email = 'efraim@electrosonteleco.com'
          contact.name = "Efraim"
          contact.type = "Diretor de Operações"
          this.contactsSrvc.post(contact).subscribe(
              (data) => {
                this.nonComplianceService.allContacts.push(data.contact)
                this.nonComplianceService.nc.contacts.push(data.contact)
              }
          )
        }
        if (!this.nonComplianceService.allContacts.some(e => e.email === 'manuela.starowsta@electrosonteleco.com.br')) {
          let contact = new Contact()
          contact.email = 'manuela.starowsta@electrosonteleco.com.br'
          contact.name = "Manuela Starowsta"
          contact.type = "SGQ"
          this.contactsSrvc.post(contact).subscribe(
              (data) => {
                this.nonComplianceService.allContacts.push(data.contact)
                this.nonComplianceService.nc.contacts.push(data.contact)
              }
          )
        }
        if (!this.nonComplianceService.allContacts.some(e => e.email === this.nonComplianceService.nc.emissor?.sector?.responsible_email) && this.nonComplianceService.nc.emissor?.sector?.responsible_email) {
          let contact = new Contact()
          contact.email = this.nonComplianceService.nc.emissor.sector.responsible_email
          contact.name = this.nonComplianceService.nc.emissor.sector.responsible_name
          contact.type = this.nonComplianceService.nc.emissor?.sector?.name
          this.contactsSrvc.post(contact).subscribe(
              (data) => {
                this.nonComplianceService.allContacts.push(data.contact)
                this.nonComplianceService.nc.contacts.push(data.contact)
              }
          )
        }
        if (!this.nonComplianceService.allContacts.some(e => e.email === afectedsector!.responsible_email)) {
          let contact = new Contact()
          contact.email = afectedsector!.responsible_email
          contact.name = afectedsector!.responsible_name
          contact.type = afectedsector!.name

          this.contactsSrvc.post(contact).subscribe(
              (data) => {
                this.nonComplianceService.allContacts.push(data.contact)
                this.nonComplianceService.nc.contacts.push(data.contact)
              }
          )
        }

        this.nonComplianceService.nc.contacts = this.nonComplianceService.nc.contacts.filter((value, index, self) =>
                index === self.findIndex((conctact) => (
                conctact.email === value.email
                ))
        )
        console.log(this.nonComplianceService.nc.contacts)
    });
  }
}
