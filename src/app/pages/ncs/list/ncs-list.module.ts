import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NcsListRoutingModule } from './ncs-list-routing.module';
import { NcsListComponent } from './ncs-list.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    NcsListComponent
  ],
  imports: [
    CommonModule,
    NcsListRoutingModule,
    TableModule
  ]
})
export class NcsListModule { }
