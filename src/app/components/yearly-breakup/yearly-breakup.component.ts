import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    ApexResponsive,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { StarterComponent } from 'src/app/pages/starter/starter.component';
import { DashboardService } from 'src/app/services/dashboard.service';


export interface yearlyChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    responsive: ApexResponsive;
}



@Component({
    selector: 'app-yearly-breakup',
    templateUrl: './yearly-breakup.component.html',
    imports: [MaterialModule, NgApexchartsModule, TablerIconsModule, StarterComponent],
    encapsulation: ViewEncapsulation.None,
})
export class AppYearlyBreakupComponent {
    // @Input() inquiryCountsTotal_forworded: number;
    inquiryCountsTotal_forworded : number;
    inquiryCountsTotal_resolved : number;
    inquiryCountsTotal_rejected : number;
  
    inquiryCountsTotal: any;
    constructor(private dashboardService: DashboardService) {


    }

    ngOnInit(){
        this.dashboardService.getDashboardData().subscribe(
            {
              next: (data)=>{
                console.log("data from dash",data)
                this.inquiryCountsTotal = data.inquiryCountsTotal;
      
                var forwordedData = this.inquiryCountsTotal.find((x: { initial_status_1: string; }) => x.initial_status_1 == "Forwarded");
      
                this.inquiryCountsTotal_forworded = forwordedData.count;
                console.log("data from dash- inquiryCountsTotal_forworded",this.inquiryCountsTotal_forworded)
                var resolvedData = this.inquiryCountsTotal.find((x: { initial_status_1: string; }) => x.initial_status_1 == "Resolved");
      
                this.inquiryCountsTotal_resolved = resolvedData.count;
      
                var rejectedData = this.inquiryCountsTotal.find((x: { initial_status_1: string; }) => x.initial_status_1 == "Rejected");
      
                this.inquiryCountsTotal_rejected = rejectedData.count;
      
              },
              error: (error)=>{
                console.log(error);
              }
            }
          )
    }
}
