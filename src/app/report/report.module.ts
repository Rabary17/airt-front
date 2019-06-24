import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { ReportComponent } from './report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import {ReportRoutingModule } from './report-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportMenuComponent } from './report-menu/report-menu.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { AnnualReportComponent } from './annual-report/annual-report.component';
@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxChartsModule,
  ],
  declarations: [ReportComponent, DailyReportComponent, DashboardComponent, ReportMenuComponent, WeeklyReportComponent, MonthlyReportComponent, AnnualReportComponent]
})
export class ReportModule { }
