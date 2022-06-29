import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //title = 'appBootstrap';


  title = environment.title;
  apiURL = environment.apiURL;

  closeResult: string = ''

  form: any = {
    email: '',
    password: '',
    registerPassword:'',
    confirmPassword: ''
  };

  hashUser:string;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: ActivatedRoute, private authService: AuthService, private tokenStorage: TokenStorageService,
    private modalService: NgbModal, private messageService: MessageService) { }

  ngOnInit(): void {

    this.router.queryParams.subscribe(param => {      
      this.hashUser = param['hashUser']
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {

    var isFormValid:boolean = this.validarCampos()

    if (!this.hashUser && isFormValid) {

      const { email, password } = this.form;
      this.authService.login(email,password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token.token);
          this.tokenStorage.saveUser(data.user);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.roles = this.tokenStorage.getUser().roles;
        }
      )      
    } else  if (isFormValid){

      const { registerPassword, confirmPassword } = this.form;

        this.authService.registerPassword(registerPassword, this.hashUser).subscribe(
          data => {
            this.messageService.add({
              severity: 'success',
              summary: 'Senha cadastrada com sucesso!',
              life: 5000,
            });
           this.hashUser = '';
          }
        )       
    }

  }

  validarCampos() {
    if (!this.hashUser) {
      const { email, password } = this.form;

      if (!email || !password) {
        this.messageService.add({
          severity: 'info',
          summary: 'Digite seu e-mail e sua senha',
          life: 5000,
        });
        return false;
      }
    } else {
      const { registerPassword, confirmPassword } = this.form;

      if (!registerPassword || !confirmPassword) {
        this.messageService.add({
          severity: 'info',
          summary: 'Preencha os campos com sua nova senha!',
          life: 5000,
        });
        return false;
      }

      if (registerPassword != confirmPassword) {
        this.messageService.add({
          severity: 'error',
          summary: 'Senhas não conferem!',
          life: 5000,
        });
        return false;
      }

    } 
    return true
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
