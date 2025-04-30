import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExceptionLogDto } from '../../../core/services/exception.service';

@Component({
  selector: 'app-exception-dialog',
  templateUrl: './exception-dialog.component.html',
  styleUrl: './exception-dialog.component.scss'
})
export class ExceptionDialogComponent {
  exception: ExceptionLogDto = new ExceptionLogDto();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.exception = config.data;
  }

  returnDate(date: Date): string {
    return new Date(date).toLocaleString();

  }
}
