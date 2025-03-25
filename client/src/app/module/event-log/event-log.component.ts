import { Component } from '@angular/core';
import { EventLogDto, EventService } from '../../core/services/event.service';
import { ToastService } from '../../core/services/toast.service';
import { ROW_PER_PAGE_DEFAULT_LIST, ROW_PER_PAGE_DEFAULT } from '../../core/shared/constants/common.constants';
import { Table } from 'primeng/table';
import { FormControl } from '@angular/forms';
import { OptionsModel } from '../../core/services/components.service';
import { debounceTime } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrl: './event-log.component.scss'
})
export class EventLogComponent {
  ROW_PER_PAGE_DEFAULT_LIST = ROW_PER_PAGE_DEFAULT_LIST;
  ROW_PER_PAGE_DEFAULT = ROW_PER_PAGE_DEFAULT;
  eventList: EventLogDto[] = [];
  selectedEvents: EventLogDto[] = [];
  loading: boolean = true;
  searchFormControl: FormControl = new FormControl('');
  searchOptionsFormControl: FormControl = new FormControl('eventName');
  searchOptions: OptionsModel[] = [];
  cols!: Column[];

  constructor(
    private eventService: EventService,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: res => {
        if (res.isSuccess) {
          this.eventList = res.data;

          this.cols = [
            { field: 'uid', header: 'UID' },
            { field: 'project', header: 'Project' },
            { field: 'eventName', header: 'Event Name' },
            { field: 'description', header: 'Description' },
            { field: 'module', header: 'Module' },
            { field: 'modifiedDate', header: 'Updated Date Time' },
            { field: 'modifiedBy', header: 'User' },
          ];

          this.searchOptions = [
            {
              label: "UID",
              value: "uid"
            },
            {
              label: "Project",
              value: "project"
            },
            {
              label: "Event Name",
              value: "eventName"
            },
            {
              label: "Description",
              value: "description"
            },
            {
              label: "Module",
              value: "module"
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
