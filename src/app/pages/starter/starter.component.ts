import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppSalesOverviewComponent } from 'src/app/components/sales-overview/sales-overview.component';
import { AppYearlyBreakupComponent } from 'src/app/components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from 'src/app/components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from 'src/app/components/recent-transactions/recent-transactions.component';
import { AppProductPerformanceComponent } from 'src/app/components/product-performance/product-performance.component';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppSalesOverviewComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppRecentTransactionsComponent,
    AppProductPerformanceComponent,
    AppBlogCardsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { 
  
  inquiryCountsTotal_forworded : number;
  inquiryCountsTotal_resolved : number;
  inquiryCountsTotal_rejected : number;

  inquiryCountsTotal: any;

  obj: any = {
    "todaySummary": [
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Resolved",
            "count": 1
        },
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Rejected",
            "count": 1
        },
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Forwarded",
            "count": 1
        }
    ],
    "weeklySummary": [
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Forwarded",
            "count": 4
        },
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Resolved",
            "count": 1
        },
        {
            "formatted_time": "00:00:00",
            "initial_status_1": "Rejected",
            "count": 1
        }
    ],
    "monthlySummary": [
        {
            "formatted_date": "2025-03-01",
            "initial_status_1": "Forwarded",
            "count": 1
        },
        {
            "formatted_date": "2025-03-03",
            "initial_status_1": "Forwarded",
            "count": 1
        },
        {
            "formatted_date": "2025-03-04",
            "initial_status_1": "Resolved",
            "count": 7
        },
        {
            "formatted_date": "2025-03-04",
            "initial_status_1": "Forwarded",
            "count": 12
        },
        {
            "formatted_date": "2025-03-05",
            "initial_status_1": "Forwarded",
            "count": 2
        },
        {
            "formatted_date": "2025-03-12",
            "initial_status_1": "Forwarded",
            "count": 3
        },
        {
            "formatted_date": "2025-03-15",
            "initial_status_1": "Resolved",
            "count": 1
        },
        {
            "formatted_date": "2025-03-15",
            "initial_status_1": "Rejected",
            "count": 1
        },
        {
            "formatted_date": "2025-03-15",
            "initial_status_1": "Forwarded",
            "count": 1
        }
    ],
    "inquiryCountsTotal": [
        {
            "initial_status_1": "Forwarded",
            "count": 20
        },
        {
            "initial_status_1": "Resolved",
            "count": 8
        },
        {
            "initial_status_1": "Rejected",
            "count": 1
        }
    ],
    "inquiryCountsByUserTotal": [
        {
            "email": "dilshan@gmail.com",
            "count": 7,
            "user_as": {
                "email": "dilshan@gmail.com"
            }
        },
        {
            "email": "sooriya3510@gmail.com",
            "count": 4,
            "user_as": {
                "email": "sooriya3510@gmail.com"
            }
        },
        {
            "email": "dulanjitharaka@gmail.com",
            "count": 14,
            "user_as": {
                "email": "dulanjitharaka@gmail.com"
            }
        },
        {
            "email": "sandunisashikalamadu@gmail.com",
            "count": 4,
            "user_as": {
                "email": "sandunisashikalamadu@gmail.com"
            }
        }
    ]
};

  constructor(private dashboardService: DashboardService) {
    
  }

  ngOnInit(){

  }
}