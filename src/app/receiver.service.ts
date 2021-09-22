import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receiver } from './receiver';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:8080/BgetDetails/"
  getBById(bic:string): Observable<Receiver>{
    return this.http.get<Receiver>(this.url+bic)
  }

  url2 = "http://localhost:8080/sdnlist/"
  getSdn(name:string){
    console.log(this.http.get(this.url2+name,{responseType: 'text' }))
    return this.http.get(this.url2+name,{responseType: 'text' })
  }
}
