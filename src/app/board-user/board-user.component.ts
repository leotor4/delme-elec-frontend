import { UserService } from '../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {


  users?: User[] = [];
  currentUser: User = {};
  currentIndex = -1;
  email = '';

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.listUsers()
  }

  listUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data.users;
          console.log(typeof(data));
          console.log(this.users)
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    //this.retrieveTutorials();
    //this.currentTutorial = {};
    //this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    //this.currentTutorial = tutorial;
    //this.currentIndex = index;
  }

  removeAllUsers(): void {
    /*
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
    */
  }


  searchEmail(): void {
    this.currentUser = {};
    this.currentIndex = -1;
    /*this.userService.findByEmail(this.email).subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });*/
  }
}
