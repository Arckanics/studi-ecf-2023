import { Injectable } from '@angular/core';
import { AbstractService } from "./abstract-service";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientNoteService extends AbstractService {

  url: string = '/comments'

  constructor(private http: HttpClient) {
    super()
  }

  getFrontComments() {
    return this.http.get(this.url, {
      headers: {
        "XML-Http-Request": "true"
      }
    }).pipe(
      catchError(this.handleError('getFrontComments', []))
    )
  }
}
