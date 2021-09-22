import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { msg1 } from './msg';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private http:HttpClient) { }
  url ="http://localhost:8080/MgetDetails"
  getAll():Observable<msg1[]>{
    return this.http.get<msg1[]>(this.url);
  }
}
