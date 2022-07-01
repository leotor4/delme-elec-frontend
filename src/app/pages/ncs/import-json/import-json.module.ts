import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

import {ImportJsonComponent} from "./import-json.component";
import {ImportJsonRoutingModule} from "./import-json-routing.module";
import {ToastModule} from "primeng/toast";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ImportJsonComponent
  ],
    imports: [
        CommonModule,
        ImportJsonRoutingModule,
        FileUploadModule,
        HttpClientModule,
        ToastModule,
        TranslateModule,

    ]
})
export class ImportJsonModule { }
