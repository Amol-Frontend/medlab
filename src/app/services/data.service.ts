import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
