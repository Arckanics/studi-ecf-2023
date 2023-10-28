import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DatabaseService {

  private ls: Storage
  constructor(
    private http: HttpClient,

  ) {
    this.ls = window.localStorage
  }

  getHeaders() {
    const token = this.ls.getItem('user_token');
    return {
      'XML-Http-Request': 'true',
      'Auth-User': token ? token : ""
    }
  }
  getData(db: string) {
    return this.http.get(`/${db}`, {headers: this.getHeaders()})
  }

  fullRequest(db: string) {
    return this.http.get(`/${db}`, { headers: this.getHeaders(), observe: "response" })
  }

  post(db: string, data: any) {
    return this.http.post(`/${db}`, data,{ headers: this.getHeaders(), observe: "response" })
  }

  put(db: string, data: any) {
    return this.http.put(`/${db}`, data,{ headers: this.getHeaders(), observe: "response" })
  }

  delete(db: string, data: any) {
    return this.http.delete(`/${db}?id=${data}`, { headers: this.getHeaders(), observe: "response" })
  }

}
