import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ReportComponent } from '../report/report.component';
import { DailyReportComponent } from '../report/daily-report/daily-report.component';
import { DashboardComponent } from '../report/dashboard/dashboard.component';
import { ReportMenuComponent } from '../report/report-menu/report-menu.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { AnnualReportComponent } from './annual-report/annual-report.component';

const reportRoutes: Routes = [
    {
      path: '',
      component: ReportComponent,
      children: [
        {
          path: 'daily',
          component: DailyReportComponent,
          resolve: {}
        },
        {
            path: 'weekly',
            component: WeeklyReportComponent,
            resolve: {}
        },{
            path: 'monthly',
            component: MonthlyReportComponent,
            resolve: {}
        },
        {
              path: 'annual',
              component: AnnualReportComponent,
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
    ReportComponent,
    DailyReportComponent,
    DashboardComponent,
    ReportMenuComponent
];
