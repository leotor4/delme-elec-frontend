import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Contact} from "../../../../../models/contact.model";
import {ContactsService} from "./contacts.service";

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})

export class StakeholdersComponent implements OnInit {

  contactsList: Contact[] = [];
  allContacts: Contact[];
  formDialog: boolean;
  addContactsDialog: boolean
  contact: Contact = {};
  selectedContacts: Contact[] = []
  selectedContact: String;
  results: Contact[];
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
        this.contactsList = this.contactsList.filter(val => val.id !== contact.id);
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
    this.addContactsDialog = true;
  }
  hideAddContacts() {
    this.addContactsDialog = false;
    this.selectedContacts = [];
  }
  hideDialog() {
    this.formDialog = false;
  }

  saveContact() {
    if(!this.contact.id){
      this.contactsSrvc.post(this.contact).subscribe(data=> {
        this.contactsList.push(data.contact)
        this.messageService.add({severity:'info', summary: 'Contato criado com sucesso', life: 3000});

      }, error => {
        this.messageService.add({severity:'error', summary: 'Campos inválidos', life: 3000});
      })
      this.contact={}
    } else{
      this.contactsSrvc.update(this.contact).subscribe(data=>{
        let index = this.contactsList.findIndex(contact =>{
          return contact.id==data.contact.id
        })
        this.contactsList[index]= data.contact;
        this.messageService.add({severity:'info', summary: 'Contato atualizado com sucesso', life: 3000});
      }, error => {
        this.messageService.add({severity:'error', summary: 'Campos inválidos', life: 3000});
      })
    }

    this.formDialog = false;
  }

  search(event:any) {
    let filtered: any[] = [];
    let query = event.query;
    let contacts = this.allContacts.filter(val => this.contactsList.indexOf(val) < 0 && this.selectedContacts.indexOf(val) < 0)
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.name?.toLowerCase().indexOf(query.toLowerCase()) == 0|| contact.email?.toLowerCase().indexOf(query.toLowerCase())  == 0) {
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
    this.selectedContacts = this.selectedContacts.filter(val => val.id !== contact.id);
  }

  createNewContact() {
    this.contact = {}
    this.formType = "Criar"
    this.addContactsDialog = false;
    this.formDialog = true;
  }

  addToTable() {
    this.addContactsDialog = false;
    this.contactsList = this.contactsList.concat(this.selectedContacts);
    this.selectedContacts = [];
  }

  private getContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
      this.allContacts = data.contact;
      this.contactsList = this.allContacts.filter(val => val.id! <= 4)
    })
  }
}
