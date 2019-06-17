import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { ReportComponent } from './report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import {ReportRoutingModule } from './report-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportMenuComponent } from './report-menu/report-menu.component'
@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxChartsModule,

  ],
  declarations: [ReportComponent, DailyReportComponent, DashboardComponent, ReportMenuComponent]
})
export class ReportModule { }
