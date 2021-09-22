import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sender } from './sender';

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(private http:HttpClient) { }

  public url:string="http://localhost:8080/CgetDetails/"

  public getCById(id:string) : Observable<Sender>{
    console.log("Request sent")
    return this.http.get<Sender>(this.url+id.trim())
  }

  url2="http://localhost:8080/getTransferT/"

  public getTransferT(id:string){
    console.log(this.http.get<string>(this.url2+id.trim()))
    return this.http.get(this.url2 + id.trim(),{responseType: 'text' })
    //.pipe(map((res:Response) => res.text()))
  }
}
