import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url="http://localhost:8080/transaction/";
  constructor(private http:HttpClient) { 
  }
  postaddtransaction(transaction:Transaction):Observable<Transaction>
  {
    return this.http.post<Transaction>(this.url,transaction);
  }
}
