import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

import {ImportJsonComponent} from "./import-json.component";
import {ImportJsonRoutingModule} from "./import-json-routing.module";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    ImportJsonComponent
  ],
  imports: [
    CommonModule,
    ImportJsonRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule

  ]
})
export class ImportJsonModule { }
