import { Observable, of } from "rxjs";


export abstract class AbstractService {

  protected handleError<T>(operation = 'operation', result?: []) {
    return (error: any): Observable<T> => {
      console.error(`${operation} : ${error}`)
      return of(result as T)
    }
  }
}
