import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url="http://localhost:3000/cars"
  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation= 'operation', result?: []) {
    return (error: any): Observable<T> => {
      console.error(`${operation} : ${error}`)
      return of(result as T)
    }
  }

  getCars() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError('getCars', []))
    )
  }
}
