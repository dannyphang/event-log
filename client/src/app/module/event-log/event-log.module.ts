import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventLogRoutingModule } from './event-log-routing.module';
import { EventLogComponent } from './event-log.component';
import { ComponentsModule } from '../../core/shared/components/components.module';
import { CommonSharedModule } from '../../core/shared/modules/common-shared.module';
import { MaterialModule } from '../../core/shared/modules/material.module';
import { PrimeNgModule } from '../../core/shared/modules/primeng.module';


@NgModule({
  declarations: [
    EventLogComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    EventLogRoutingModule,
    ComponentsModule,
    MaterialModule,
    PrimeNgModule
  ]
})
export class EventLogModule { }
