import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Contact} from "../../../../../models/contact.model";
import {ContactsService} from "./contacts.service";

const CONTACTS: Contact[] = [
  {
    name: "lucas",
    email: "lucas@gmail.com",
    type: "emissor",
  },
  {
    name: 'João',
    email: "João@gmail.com",
    type: "Area afetada"
  },
  {
    name: 'Ednaldo',
    email: "Ednaldo@gmail.com",
    type: "emissor",
  },
  {
    name: 'Lucio',
    email: "Lucio@gmail.com",
    type: "emissor",
  }
];
@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})

export class StakeholdersComponent implements OnInit {

  contactsList = CONTACTS;
  allContacts: Contact[];
  formDialog: boolean;
  newContactDialog: boolean
  contact: Contact = {};
  selectedContacts: Contact[] = []
  selectedContact: String;
  results: string[];
  formType: string;

  constructor(private confirmationService:ConfirmationService, private messageService:MessageService, private contactsSrvc:ContactsService){ }

  ngOnInit(): void {
    this.getContacts()
  }


  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar o contato ' + contact.name + '?',
      header: 'Excluir Contato',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactsList = this.contactsList.filter(val => val.name !== contact.name);
        this.messageService.add({severity:'info', summary: 'Contato Removido com sucesso', life: 3000});
      }
    });
  }

  editContact(contact: Contact) {
    this.contact = {...contact};
    this.formType = "Editar"
    this.formDialog = true;
  }
  showAddContacts() {
    this.newContactDialog = true;
  }
  hideAddContacts() {
    this.newContactDialog = false;
    this.selectedContacts = [];
  }
  hideDialog() {
    this.formDialog = false;
  }

  saveProduct() {
    if(this.formType === "Criar"){
      this.contactsSrvc.post(this.contact).subscribe(data=>this.contactsList.push(data.contact))
      this.messageService.add({severity:'info', summary: 'Contato criado com sucesso', life: 3000});

    } else{
      console.log(this.contact)
      this.contactsSrvc.update(this.contact).subscribe()
      this.messageService.add({severity:'info', summary: 'Contato atualizado com sucesso', life: 3000});
    }

    this.formDialog = false;
  }

  search(event:any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.allContacts.length; i++) {
      let contact = this.allContacts[i];
      if (contact.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(contact);
      }
    }
    this.results = filtered;
  }

  show(contact: Contact) {
    this.selectedContacts.push(contact)
    this.selectedContact = ""
  }

  uncheckContact(contact: Contact) {
    this.selectedContacts = this.selectedContacts.filter(val => val.name !== contact.name);
  }

  createNewContact() {
    this.contact = {}
    this.formType = "Criar"
    this.newContactDialog = false;
    this.formDialog = true;
  }

  addToTable() {
    this.newContactDialog = false;
    this.contactsList = this.contactsList.concat(this.selectedContacts)
  }

  private getContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
      this.allContacts = data.contact;
    })
  }
}
