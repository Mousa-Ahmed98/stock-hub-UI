import { Component, OnDestroy, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api/sortevent';
import { IStock } from '../../models/istock';
import { StockServiceService } from '../../Services/stock-service.service';
import {TableModule} from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TimestampPipePipe } from '../../pipes/timestamp-pipe.pipe';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IStockUpdateRequest } from '../../models/istock-update-request';
import { FormsModule } from '@angular/forms';
import { SignalRService } from '../../Services/signal-r.service';
import {ChartModule} from 'primeng/chart'
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [TableModule, CurrencyPipe, 
    TimestampPipePipe, ButtonModule, CommonModule, FormsModule
  ,DialogModule, ChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit, OnDestroy { 
  stocks!: IStock[];
  private stockToUpdate!: IStock;
  newPrice: number = 0;
  visible = false;

  data: any;
  options: any;
  constructor(private stockService: StockServiceService, private router: Router
    ,private signalRService: SignalRService, private primengConfig: PrimeNGConfig ) {}
  ngOnDestroy(): void {
    console.log("OnDestroy");
    this.signalRService.closeConnection().subscribe(() => {
      console.log("Connection closed");
    })
  }

  ngOnInit() {
     this.getAll();
     this.signalRService.startConnection().subscribe(() => {
      this.signalRService.receiveMessage().subscribe((res) => {
        console.log(res);
        let stock = this.stocks.find(s => s.symbol == res['symbol']);
        console.log("testing signalR");
        stock!.currentPrice = Number(res['newPrice']);
        console.log(stock);
      });
    });

    
  }

  customSort(event: SortEvent) {
      event.data?.sort((data1, data2) => {
          let value1 = data1[event.field!];
          let value2 = data2[event.field!];
          let result = null;

          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

          return event.order! * result;
      });
  }

  private getAll(){
    this.stockService.getStocks().subscribe((data) => {
      this.stocks = data;
      console.log(data);
  });
  }
  goToSymbolHistory(symbol: string){
    this,this.router.navigate(["home/stock", symbol]);
  }

  showDialog(stock: IStock): void {
    this.stockToUpdate = stock;
    console.log(this.stockToUpdate)
    this.visible = true;
  }

  updatePrice(){
    this.visible = false;
    let stockUpdateRequest: IStockUpdateRequest = {
      symbol: this.stockToUpdate.symbol,
      oldPrice: this.stockToUpdate.currentPrice,
      newPrice: this.newPrice
    }
    
    this.stockService.updatePrice(stockUpdateRequest).subscribe(
      (val) => {
        console.log("After update");
        console.log(stockUpdateRequest);
      },
      (error) => {
        console.error('Update failed:', error);
      },
    );
  }
}
