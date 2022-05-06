
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatePropComponent} from "./create-prop.component";

const routes: Routes = [
  {
		path: '',
		component: CreatePropComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePropRoutingModule { }
