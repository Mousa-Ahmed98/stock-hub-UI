import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockServiceService } from '../../Services/stock-service.service';
import { IStockUpdateResponse } from '../../models/istock-update-response';
import {TableModule} from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TimestampPipePipe } from '../../pipes/timestamp-pipe.pipe';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-stock-history',
  standalone: true,
  imports: [TableModule, CommonModule, CurrencyPipe, TimestampPipePipe, ButtonModule],
  templateUrl: './stock-history.component.html',
  styleUrl: './stock-history.component.css'
})
export class StockHistoryComponent implements OnInit{
  symbol!: string;
  stockHistory!: IStockUpdateResponse[];
  constructor(private route: ActivatedRoute, private stockService: StockServiceService
    , private router: Router
  )
  {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.symbol = params['symbol'])
    this.stockService.getStockHistory(this.symbol).subscribe((data) => {
      this.stockHistory = data
      console.log(this.stockHistory);
  });
    console.log(this.symbol);
  }

  goBack(){
      this,this.router.navigate([""]);
  }
  
}
