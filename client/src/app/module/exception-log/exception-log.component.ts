import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { debounceTime } from 'rxjs';
import { OptionsModel } from '../../core/services/components.service';
import { EventLogDto, EventService } from '../../core/services/event.service';
import { ToastService } from '../../core/services/toast.service';
import { ROW_PER_PAGE_DEFAULT_LIST, ROW_PER_PAGE_DEFAULT } from '../../core/shared/constants/common.constants';
import { ExceptionLogDto, ExceptionService } from '../../core/services/exception.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-exception-log',
  templateUrl: './exception-log.component.html',
  styleUrl: './exception-log.component.scss'
})
export class ExceptionLogComponent {
  ROW_PER_PAGE_DEFAULT_LIST = ROW_PER_PAGE_DEFAULT_LIST;
  ROW_PER_PAGE_DEFAULT = ROW_PER_PAGE_DEFAULT;
  exceptionList: ExceptionLogDto[] = [];
  selectedExceptions: ExceptionLogDto[] = [];
  loading: boolean = true;
  searchFormControl: FormControl = new FormControl('');
  searchOptionsFormControl: FormControl = new FormControl('module');
  searchOptions: OptionsModel[] = [];
  cols!: Column[];

  constructor(
    private exceptionService: ExceptionService,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.exceptionService.getAllExceptions().subscribe({
      next: res => {
        if (res.isSuccess) {
          this.exceptionList = res.data;

          this.cols = [
            { field: 'uid', header: 'UID' },
            { field: 'errorMessage', header: 'Error Message' },
            { field: 'module', header: 'Module' },
            { field: 'method', header: 'Method' },
            { field: 'project', header: 'Project' },
            { field: 'path', header: 'Path' },
            { field: 'modifiedDate', header: 'Updated Date Time' },
            { field: 'modifiedBy', header: 'User' },
          ];

          this.searchOptions = [
            {
              label: "UID",
              value: "uid"
            },
            {
              label: "Error Message",
              value: "errorMessage"
            },
            {
              label: "Module",
              value: "module"
            },
            {
              label: "Method",
              value: "method"
            },
            {
              label: "Project",
              value: "project"
            },
            {
              label: "Path",
              value: "path"
            },
            {
              label: "Updated Date Time",
              value: "modifiedDate"
            },
            {
              label: "User",
              value: "modifiedBy"
            }
          ]

          this.loading = false;
        }
      },
      error: error => {
        this.toastService.addSingle({
          message: error,
          severity: 'error',
        })
      }
    });

    this.searchFormControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      console.log(value)
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchFormControl.reset({ emitEvent: false });
  }

  formatDate(dateValue: string) {
    return new Date(dateValue);
  }
}
