import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}

  multi: any[];

  view: any[] = [1200, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = true;

  colorScheme = {
    domain: ['#8b4c0c', '#c3a550', '#f99d5b', '#bf1a1a']
  };

  // line, area
  autoScale = true;
  

  constructor() { 
    this.view = [innerWidth / 1.3, 400];
  }

  ngOnInit() {
    this.multi = [
      {
        "name": "Open",
        "series": [
          {
            "value": 2,
            "name": "2016-09-17T09:35:30.969Z"
          },
          {
            "value": 5,
            "name": "2016-09-19T12:03:32.216Z"
          },
          {
            "value": 4,
            "name": "2016-09-16T14:41:59.848Z"
          },
          {
            "value": 1,
            "name": "2016-09-13T01:27:38.343Z"
          },
          {
            "value": 3,
            "name": "2016-09-23T00:33:56.905Z"
          }
        ]
      },
      {
        "name": "In progress",
        "series": [
          {
            "value": 5,
            "name": "2016-09-17T09:35:30.969Z"
          },
          {
            "value": 8,
            "name": "2016-09-19T12:03:32.216Z"
          },
          {
            "value": 1,
            "name": "2016-09-16T14:41:59.848Z"
          },
          {
            "value": 5,
            "name": "2016-09-13T01:27:38.343Z"
          },
          {
            "value": 2,
            "name": "2016-09-23T00:33:56.905Z"
          }
        ]
      },
      {
        "name": "Pending",
        "series": [
          {
            "value": 5,
            "name": "2016-09-17T09:35:30.969Z"
          },
          {
            "value": 1,
            "name": "2016-09-19T12:03:32.216Z"
          },
          {
            "value": 7,
            "name": "2016-09-16T14:41:59.848Z"
          },
          {
            "value": 3,
            "name": "2016-09-13T01:27:38.343Z"
          },
          {
            "value": 9,
            "name": "2016-09-23T00:33:56.905Z"
          }
        ]
      },
      {
        "name": "Close",
        "series": [
          {
            "value": 8,
            "name": "2016-09-17T09:35:30.969Z"
          },
          {
            "value": 7,
            "name": "2016-09-19T12:03:32.216Z"
          },
          {
            "value": 2,
            "name": "2016-09-16T14:41:59.848Z"
          },
          {
            "value": 9,
            "name": "2016-09-13T01:27:38.343Z"
          },
          {
            "value": 0,
            "name": "2016-09-23T00:33:56.905Z"
          }
        ]
      },
    ];
  }

}
