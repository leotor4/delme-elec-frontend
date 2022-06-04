import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapRoutingModule } from './bootstrap-routing.module';
import { BootstrapComponent } from './bootstrap.component';
import { MenuComponent } from '../header/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    BootstrapRoutingModule,
    MenubarModule,
    CardModule,
    NgxChartsModule,
    ToastModule,

  ],
  providers: [
    MessageService
  ],
  exports: [
    BootstrapComponent
  ]
})
export class BootstrapModule { }
