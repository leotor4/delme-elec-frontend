import { PlaceResolver } from './../../../resolve/place.resolver';
import { NcsCreateComponent } from './ncs-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: '',
		component: NcsCreateComponent,
    resolve: { places: PlaceResolver }
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NcsCreateRoutingModule { }
