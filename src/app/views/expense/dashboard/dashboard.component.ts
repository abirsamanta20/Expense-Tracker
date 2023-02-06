import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  statsData: any = [];

  constructor(private transaction: TransactionService) {}

  ngOnInit(): void {
    this.fetchStatisticalData();
  }

  // fetch statistics data
  fetchStatisticalData = () => {
    this.transaction.fetchTransactionStatistics({}).then((response) => {
      if (response.flag) {
        if (response.result.length) {
          response.result.forEach((category) => {
            this.statsData.push({ name: category.name + '(' + category.type + ')', value: category.total_amount });
          });
          this.statsData = JSON.parse(JSON.stringify(this.statsData));
        }
      }
    });
  };
}
