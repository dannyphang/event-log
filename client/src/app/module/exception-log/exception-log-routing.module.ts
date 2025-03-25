import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExceptionLogComponent } from './exception-log.component';

const routes: Routes = [
  {
    path: '',
    component: ExceptionLogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionLogRoutingModule { }
