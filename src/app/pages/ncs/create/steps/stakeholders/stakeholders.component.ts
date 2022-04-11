import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
interface Contact {
  id?: string
  name?: string;
  email?: string;
  cType?: string;
}

const CONTACTS: Contact[] = [
  {
    name: "lucas",
    email: "lucas@gmail.com",
    cType: "emissor",
  },
  {
    name: 'João',
    email: "João@gmail.com",
    cType: "Area afetada"
  },
  {
    name: 'Ednaldo',
    email: "Ednaldo@gmail.com",
    cType: "emissor",
  },
  {
    name: 'Lucio',
    email: "Lucio@gmail.com",
    cType: "emissor",
  }
];
@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})

export class StakeholdersComponent implements OnInit {

  contacts = CONTACTS;
  formDialog: boolean;
  submitted: boolean;
  newContactDialog: boolean
  contact: Contact = {};
  selectedContacts: Contact[] = []
  selectedContact: String;
  results: string[];
  formType: string;

  constructor(private confirmationService:ConfirmationService, private messageService:MessageService){ }

  ngOnInit(): void {
  }


  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar o contato ' + contact.name + '?',
      header: 'Excluir Contato',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contacts = this.contacts.filter(val => val.name !== contact.name);
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
  }
  hideDialog() {
    this.formDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    //TODO
  }

  search(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < CONTACTS.length; i++) {
      let contact = CONTACTS[i];
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
    this.contacts = this.contacts.concat(this.selectedContacts)
  }
}
