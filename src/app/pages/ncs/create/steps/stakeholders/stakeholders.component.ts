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
  editDialog: boolean;
  submitted: boolean;
  newContactDialog: boolean
  contact: Contact;

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
    this.editDialog = true;
  }
  newContact() {
    this.newContactDialog = true;
  }
  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    //TODO
  }
}
