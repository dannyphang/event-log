import { Component } from '@angular/core';
import { EventLogDto, EventService } from '../../core/services/event.service';
import { ToastService } from '../../core/services/toast.service';
import { ROW_PER_PAGE_DEFAULT_LIST, ROW_PER_PAGE_DEFAULT } from '../../core/shared/constants/common.constants';
import { Table } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';
import { CONTROL_TYPE, FormConfig, OptionsModel } from '../../core/services/components.service';
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
  isSearchCollapsed: boolean = true;
  advancedSearchFormConfig: FormConfig[] = [];
  advancedSearchFormGroup: FormGroup = new FormGroup({
    uid: new FormControl(),
    project: new FormControl(),
    eventName: new FormControl(),
    description: new FormControl(),
    module: new FormControl(),
    modifiedDate: new FormControl(
      (() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      })() // Immediately Invoked Function Expression (IIFE)
    ),
    modifiedBy: new FormControl()
  });


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
      this.searchEvents();
    });

    this.advancedSearchFormConfig = [
      {
        label: "UID",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 0,
          column: 0,
        },
        fieldControl: this.advancedSearchFormGroup.get('uid'),
      },
      {
        label: "Project",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 0,
          column: 1,
        },
        fieldControl: this.advancedSearchFormGroup.get('project'),
      },
      {
        label: "Event Name",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 0,
          column: 2,
        },
        fieldControl: this.advancedSearchFormGroup.get('eventName'),
      },
      {
        label: "Description",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 1,
          column: 0,
        },
        fieldControl: this.advancedSearchFormGroup.get('description'),
      },
      {
        label: "Module",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 1,
          column: 1,
        },
        fieldControl: this.advancedSearchFormGroup.get('module'),
      },
      {
        label: "Updated Date Time",
        type: CONTROL_TYPE.Calendar,
        layoutDefine: {
          row: 1,
          column: 2,
        },
        fieldControl: this.advancedSearchFormGroup.get('modifiedDate'),
        showTime: true
      },
      {
        label: "User",
        type: CONTROL_TYPE.Textbox,
        layoutDefine: {
          row: 2,
          column: 0,
          colSpan: 4
        },
        fieldControl: this.advancedSearchFormGroup.get('modifiedBy'),
      }
    ];
  }

  clear(table: Table) {
    table.clear();
    this.searchFormControl.reset({ emitEvent: false });
  }

  formatDate(dateValue: string) {
    return new Date(dateValue);
  }

  advancedFilter() {
    this.isSearchCollapsed = !this.isSearchCollapsed;
    this.clearFilters();
  }

  clearFilters() {
    this.advancedSearchFormGroup.reset({ emitEvent: false });
  }

  searchBtn() {
    this.searchEvents();
  }

  searchEvents() {
    let params: any = {};

    // Dynamically add selected search option (dropdown value) and input field value
    const selectedKey = this.searchOptionsFormControl.value;
    if (this.searchFormControl.value && selectedKey) {
      params[selectedKey] = this.searchFormControl.value;
    }
    else if (Object.values(this.advancedSearchFormGroup.value).some(value => value !== null && value !== undefined && value !== "")) {
      const formValues = this.advancedSearchFormGroup.value;

      // Remove null, undefined, and empty string values
      const filteredValues = Object.fromEntries(
        Object.entries(formValues).filter(([_, value]) => value !== null && value !== undefined && value !== "")
      );
      params = filteredValues;
    }

    // Call searchEvents function with updated params
    this.eventService.searchEvents(params).subscribe({
      next: response => {
        if (response.isSuccess) {
          this.eventList = response.data;
        }
        else {
          this.toastService.addSingle({
            message: response.responseMessage,
            severity: 'error',
          });
        }
      },
      error: error => {
        console.log(error.error.responseMessage)
        this.toastService.addSingle({
          message: error.error.responseMessage,
          severity: 'error',
        });
      }
    });
  }
}
