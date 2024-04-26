export interface IStockUpdateResponse {
    id: number,
    newPrice: number,
    oldPrice: number,
    symbol: string,
    timeStamp: Date,
}
