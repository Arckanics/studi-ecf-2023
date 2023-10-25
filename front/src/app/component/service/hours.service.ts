import { Injectable } from '@angular/core';
import { AbstractService } from "../../services/abstract-service";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HoursService extends AbstractService {

  url: string = '/hours'

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getHours() {
    return this.http.get(this.url, {
      headers: {
        "XML-Http-Request" : "true"
      }
    }).pipe(
      catchError(this.handleError('getHours', []))
    )
  }
}
