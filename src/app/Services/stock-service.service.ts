import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IStockUpdateRequest } from '../models/istock-update-request';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/stock`);
  }

  getOnlySymbols(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/stock/GetOnlySymbols`);
  }

  getStockHistory(symbol: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/stock/${symbol}/history`);
  }

  updatePrice(stockUpdateReq: IStockUpdateRequest){
    return this.http.post(`${this.apiUrl}/api/stock/update`, stockUpdateReq).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  private _refreshRequired = new Subject<void>();

  get RefreshRequired(){
    return this._refreshRequired;
  }


}
