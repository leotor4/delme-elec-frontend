import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import { NcsListRoutingModule } from './ncs-list-routing.module';
import { NcsListComponent } from './ncs-list.component';
import {TooltipModule} from 'primeng/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    NcsListComponent
  ],
  imports: [
    CommonModule,
    NcsListRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ToastModule,
    InputTextModule,
    TooltipModule,
    ConfirmDialogModule,
    NgxChartsModule
  ]
})


export class NcsListModule { }
