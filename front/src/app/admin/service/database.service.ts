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

  private getHeaders() {
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
}
