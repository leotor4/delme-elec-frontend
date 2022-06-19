import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { User } from '../models/user.model';
import { UserService } from './../_services/user.service';
import { FilterService } from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedUser: any;

  users: any[] = [];

  filteredUsers: any[];
  

  form: any = {
    name: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private userService : UserService, private filterService: FilterService) {}

  ngOnInit(): void {
    
    console.log('init register')
    this.userService.getAll().subscribe(
      {
        next: (response:any) => {
          this.users = response.users
          console.log(this.users)
        },
        error: err => {
          console.log('error')
        }
      }
    )
  }

  filterUser(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.users.length; i++) {
      let user : User = this.users[i];

      if(user.email) {
        if (user.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(user);
        }
      }
      
    }

    this.filteredUsers = filtered;
  }

  sendMailForUser() {
    this.userService.sendMailForRegisterUser(this.selectedUser).subscribe(
      {
        next: (response:any) => {
          console.log("deu certo")
        },
        error: err => {
          console.log('deu rui,')
        }
      }
    )
    console.log('enviar email para ', this.selectedUser)
  }


  onSubmit(): void {
    const { name, email, password } = this.form;
    console.log(name)
    this.authService.register(name, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


}
