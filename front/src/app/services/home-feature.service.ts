import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract-service";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeFeatureService extends AbstractService {

  url = "/services"

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getFeatures() {
    return this.http.get(this.url, {
      headers: {
        "XML-Http-Request" : "true"
      }
    }).pipe(
      catchError(this.handleError('getFeatures', []))
    )
  }
}
