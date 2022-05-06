import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { NcsListRoutingModule } from './ncs-list-routing.module';
import { NcsListComponent } from './ncs-list.component';

@NgModule({
  declarations: [
    NcsListComponent
  ],
  imports: [
    CommonModule,
    NcsListRoutingModule,
    TableModule,
    ButtonModule
  ]
})
export class NcsListModule { }
