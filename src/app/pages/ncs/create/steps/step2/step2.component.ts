import { Component, OnInit } from "@angular/core";
type product = {
  id: number;
  name: string;
  description: string;
};
@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  selectedValue: string = "val1";
  text: string;
  results: any;
  selectedContact: any;
  products = [
    {
      id: "9083144551",
      name: "Caixa de Pandora",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      id: "31232324551",
      name: "test1",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      id: "23213421321",
      name: "test2",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      id: "12344551",
      name: "test3",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
  ];
  haveSelectedProduct: boolean;
  output: product[];
  constructor() {}

  ngOnInit(): void {
    this.haveSelectedProduct = false;
  }
  search(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    let contacts = this.products;
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (
        contact.name?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        contact.description?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        contact.id.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(contact);
      }
    }
    this.results = filtered;
  }
  show(contact: any) {
    this.haveSelectedProduct = true;
    this.selectedContact = contact;
    console.log(this.selectedContact);
  }
  test(contact: any) {
    this.haveSelectedProduct = false;
  }
}
