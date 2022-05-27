import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'appBootstrap';

  closeResult: string = ''

  form: any = {
    email: '',
    password: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private modalService: NgbModal, private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token.token);
        this.tokenStorage.saveUser(data.user);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
      },
      err => {
        if (err.status == 400) {
          this.addSingle('Credenciais Inválidas', 'error')
        }
      }
    )
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


   addSingle(msg:string, type:string) {
        this.messageService.add({severity:type, summary:msg});
    }



    clear() {
        this.messageService.clear();
    }
}
