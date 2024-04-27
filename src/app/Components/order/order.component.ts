import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from '../../models/iorder';
import { OrderService } from '../../Services/order.service';
import {TableModule} from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { TimestampPipePipe } from '../../pipes/timestamp-pipe.pipe'
import { SortEvent } from 'primeng/api/sortevent';
import { StockServiceService } from '../../Services/stock-service.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    AvatarModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    CurrencyPipe,
    TimestampPipePipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  visible: boolean = false;
  orderForm!: FormGroup;
  orders!: IOrder[];
  symbolOptions!: string[];

  constructor(private formBuilder: FormBuilder
    , private orderService: OrderService
    , private stockService: StockServiceService) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      symbol: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      orderType: [0, Validators.required]
    });

    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;

      console.log("Orders");
      console.log(data);
  });

  this.stockService.getOnlySymbols().subscribe((data) => {
    this.symbolOptions = data;
    console.log(data);
});
  }

  showDialog(): void {
    this.visible = true;
  }

  submitOrder(): void {
    if (this.orderForm.valid) {
      // Perform submission logic here
      let order = this.orderForm.value as IOrder;
      console.log(order);
      this.orderService.add(order).subscribe(
        (val) => {
          console.log('Order submitted successfully');
          console.log(val);
          this.orders.push(val);
        },
        (error) => {
          console.error('submittion failed:', error);
          // Handle login error
        },
      );
      this.visible = false;
    }
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
}