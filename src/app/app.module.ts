import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { authInterceptorProviders } from './_interceptors/auth.interceptor';
import { GlobalErrorHandler } from './_interceptors/global-error-handler';
import { AuthGuardService } from './_services/auth-guard.service';
import { AppComponent } from './app.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisualizarDocumentoDialogComponent } from './pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardUserComponent,
    VisualizarDocumentoDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BootstrapModule,
    FormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthGuardService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
