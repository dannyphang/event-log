import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [];

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.items = [
      {
        label: "Exception",
        icon: "pi pi-exclamation-triangle",
        command: () => {
          this.router.navigate(["/exception"]);
        }
      },
      {
        label: "Event Log",
        icon: "pi pi-file",
        command: () => {
          this.router.navigate(["/event"]);
        }
      }
    ];
  }
}
