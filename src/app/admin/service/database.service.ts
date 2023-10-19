import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  BDDLink: string = window.location.protocol + '//' + window.location.host.replace(/:[0-9]+$/, ':3000')

  constructor(
    private http: HttpClient
  ) {
  }

  getData(db: string) {
    return this.http.get(`${this.BDDLink}/${db}`)
  }

  fullRequest(db: string) {
    return this.http.get(`${this.BDDLink}/${db}`, { observe: "response" })
  }
}
