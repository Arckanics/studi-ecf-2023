import { Injectable } from '@angular/core';
import { catchError } from "rxjs";
import { AbstractService } from "./abstract-service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarService extends AbstractService {

  url = "cars"

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getCars() {
    return this.http.get(this.url, {
      headers: {
        "XML-Http-Request" : "true"
      }
    }).pipe(
      catchError(this.handleError('getCars', []))
    )
  }
}
