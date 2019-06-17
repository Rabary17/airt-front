import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { ReportComponent } from './report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import {ReportRoutingModule } from './report-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxChartsModule,

  ],
  declarations: [ReportComponent, DailyReportComponent, DashboardComponent]
})
export class ReportModule { }
