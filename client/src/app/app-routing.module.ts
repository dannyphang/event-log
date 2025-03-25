import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Error404Component } from './layout/error-404/error-404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./module/home/home.module').then(m => m.HomeModule),
        data: { breadcrumb: '', title: 'Home' }
      },
      {
        path: 'exception',
        loadChildren: () => import('./module/exception-log/exception-log.module').then(m => m.ExceptionLogModule),
        data: {
          breadcrumb: 'Exception',
          title: 'Exception',
        },
      },
      {
        path: 'event',
        loadChildren: () => import('./module/event-log/event-log.module').then(m => m.EventLogModule),
        data: {
          breadcrumb: 'Event Log',
          title: 'Event Log',
        },
      },
    ]
  },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule),
  // },
  {
    path: 'pagenotfound',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/pagenotfound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
