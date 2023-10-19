import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract-service";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeFeatureService extends AbstractService {

  url = "http://localhost:3000/services"

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getFeatures() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError('getFeatures', []))
    )
  }
}
