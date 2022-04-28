import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {AboutComponent} from "./about.component";
import {NcAboutRoutingModule} from "./about-routing.module";
import {ChipModule} from "primeng/chip";
import {TabViewModule} from "primeng/tabview";
import { ViewNCComponent } from './view-nc/view-nc.component';
import {ViewStakeholdersComponent} from "./view-nc/stakeholders/view-stakeholders.component";
import {AccordionModule} from "primeng/accordion";
import {ViewProductsAndPointsComponent} from "./view-nc/products-and-points/view-products-and-points.component";
import {ViewIdentifyNCComponent} from "./view-nc/identify-nc/view-identify-n-c.component";
import {EditorModule} from "primeng/editor";
import {DividerModule} from "primeng/divider";
import {CarouselModule} from "primeng/carousel";
import {TableModule} from "primeng/table";
import { ProposalComponent } from './proposal/proposal.component';



@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent,
    ViewNCComponent,
    ViewStakeholdersComponent,
    ViewProductsAndPointsComponent,
    ViewIdentifyNCComponent,
    ProposalComponent,


  ],
  imports: [
    CommonModule,
    NcAboutRoutingModule,
    ChipModule,
    TabViewModule,
    AccordionModule,
    EditorModule,
    DividerModule,
    CarouselModule,
    TableModule


  ]
})
export class NcAboutModule { }
