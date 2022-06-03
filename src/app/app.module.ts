import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from "primeng/editor";
import { RadioButtonModule } from "primeng/radiobutton";
import { ToastModule } from 'primeng/toast';

import { authInterceptorProviders } from './_interceptors/auth.interceptor';
import { GlobalErrorHandler } from './_interceptors/global-error-handler';
import { AuthGuardService } from './_services/auth-guard.service';
import { AppComponent } from './app.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { LoginComponent } from './login/login.component';
import { FechamentoDialogComponent } from "./pages/dialogs/fechamento-dialog/fechamento-dialog.component";
import { VisualizarDocumentoDialogComponent } from './pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardUserComponent,
    VisualizarDocumentoDialogComponent,
    FechamentoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapModule,
    FormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    ToastModule,
    RadioButtonModule,
    EditorModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  providers: [
    authInterceptorProviders,
    AuthGuardService ,
    MessageService 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
