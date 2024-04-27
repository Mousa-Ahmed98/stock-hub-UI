import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockServiceService } from '../../Services/stock-service.service';
import { IStockUpdateResponse } from '../../models/istock-update-response';
import {TableModule} from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TimestampPipePipe } from '../../pipes/timestamp-pipe.pipe';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart'
import { PrimeNGConfig } from 'primeng/api';
import { SignalRService } from '../../Services/signal-r.service';
@Component({
  selector: 'app-stock-history',
  standalone: true,
  imports: [TableModule, CommonModule, CurrencyPipe, TimestampPipePipe, ButtonModule, ChartModule],
  templateUrl: './stock-history.component.html',
  styleUrl: './stock-history.component.css'
})
export class StockHistoryComponent implements OnInit, OnDestroy{
  symbol!: string;
  stockHistory!: IStockUpdateResponse[];

  data: any;
  options: any;
  constructor(private route: ActivatedRoute, private stockService: StockServiceService
    , private router: Router, private signalRService: SignalRService
  )
  {
    
  }
  ngOnDestroy(): void {
    console.log("OnDestroy");
    this.signalRService.closeConnection().subscribe(() => {
      console.log("Connection closed");
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.symbol = params['symbol'])
    this.stockService.getStockHistory(this.symbol).subscribe((data) => {
      this.stockHistory = data;
      this.drawPriceChart(this.stockHistory);
  });

  //SignalR realtime changes
  this.signalRService.startConnection().subscribe(()=>{
    this.signalRService.receiveMessage().subscribe((res) => {
      console.log(res);
      let stockUpdate = res as IStockUpdateResponse
      this.stockHistory.push(stockUpdate);
      console.log(stockUpdate);
      this.drawPriceChart(this.stockHistory);
    })
  })
    
  }

  goBack(){
      this,this.router.navigate([""]);
  }


  drawPriceChart(stockHistory: IStockUpdateResponse[]){
    const labels = this.stockHistory.map(stock => {
      const date = new Date(stock.timeStamp);

    // Extracting individual components from the date object
    return this.getDateFormatted(date);
    })
    const values = this.stockHistory.map(stock => String(stock.newPrice))
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
          labels: labels,
          //labels: dates,
            datasets: [
                {
                    label: `${stockHistory[0].symbol} Dataset`,
                    data: values,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
  }
  

  private getDateFormatted(date: Date) {
    const month = date.toLocaleString('en-US', { month: 'long' }); // Full month name
    const year = date.getFullYear();
    const day = date.getDate(); // Day of the month (1-31)
    const hour = date.getHours(); // Hour (0-23)
    const minutes = date.getMinutes(); // Minutes (0-59)
    const seconds = date.getSeconds(); // Seconds (0-59)


    // Construct the label using all extracted components
    return `${month} ${day}, ${year} ${hour}:${minutes}:${seconds}`;
  }
}
