import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceManagerComponent } from "./absence-manager/absence-manager.component";

const routes: Routes = [{
  path: '',
  component: AbsenceManagerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
