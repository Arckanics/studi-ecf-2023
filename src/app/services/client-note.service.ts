import { Injectable } from '@angular/core';
import { AbstractService } from "./abstract-service";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientNoteService extends AbstractService{

  url: string = 'http://localhost:3000/commentaire'
  constructor(private http: HttpClient) {super()}

  getFrontComments() {
    return this.http.get(`${this.url}?enabled=true`).pipe(
      catchError(this.handleError('getFrontComments', []))
    )
  }
}
