import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NcsCreateRoutingModule } from './ncs-create-routing.module';
import { NcsCreateComponent } from './ncs-create.component';


@NgModule({
  declarations: [
    NcsCreateComponent
  ],
  imports: [
    CommonModule,
    NcsCreateRoutingModule
  ]
})
export class NcsCreateModule { }
