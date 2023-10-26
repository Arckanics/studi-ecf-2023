import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private headers: {[index:string]: string} = {
    'XML-Http-Request': 'true'
  }
  private ls: Storage
  constructor(
    private http: HttpClient,

  ) {
    this.ls = window.localStorage
    const token = this.ls.getItem('user_token');
    if (token) {
      this.headers["Auth-User"] = token
    }
  }

  getData(db: string) {
    const { headers } = this
    return this.http.get(`/${db}`, {headers})
  }

  fullRequest(db: string) {
    const { headers } = this
    return this.http.get(`/${db}`, { headers, observe: "response" })
  }
}
