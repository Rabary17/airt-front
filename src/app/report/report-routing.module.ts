import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { DailyReportComponent } from '../report/daily-report/daily-report.component';
import { DashboardComponent } from '../report/dashboard/dashboard.component';

const reportRoutes: Routes = [
    {
      path: '',
      component: ReportComponent,
      children: [
        {
          path: 'daily',
          component: DailyReportComponent,
          resolve: {}
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(reportRoutes)
    ],
    exports: [
      RouterModule,
    ]
  })
  export class ReportRoutingModule {}
  export const ReportComponents = [
    ReportComponent
];
