import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string="http://localhost:3000/";

  httpHeaders = new HttpHeaders({
      'content-type' : 'application/json'
  })

  constructor(private http:HttpClient) { }

  getDataFromServer(endPoint:string){
    const url = this.baseUrl + endPoint;
    //http://localhost:3000/get-category-list
    return this.http.get(url,{headers: this.httpHeaders});
  }

  postDataFromServer(endPoint:string,reqData:any){
    const url = this.baseUrl + endPoint;
    //http://localhost:3000/get-category-list
    return this.http.post(url,reqData,{headers: this.httpHeaders});
  }

    putDataToerver(endPoint:string,reqData:any){
    const url = this.baseUrl + endPoint;
    //http://localhost:3000/get-category-list
    return this.http.put(url,reqData,{headers: this.httpHeaders});
  }

  
}
