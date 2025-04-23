import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionLogRoutingModule } from './exception-log-routing.module';
import { ComponentsModule } from '../../core/shared/components/components.module';
import { CommonSharedModule } from '../../core/shared/modules/common-shared.module';
import { MaterialModule } from '../../core/shared/modules/material.module';
import { PrimeNgModule } from '../../core/shared/modules/primeng.module';
import { ExceptionLogComponent } from './exception-log.component';
import { ExceptionDialogComponent } from './exception-dialog/exception-dialog.component';


@NgModule({
  declarations: [
    ExceptionLogComponent,
    ExceptionDialogComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    ExceptionLogRoutingModule,
    ComponentsModule,
    MaterialModule,
    PrimeNgModule
  ]
})
export class ExceptionLogModule { }
