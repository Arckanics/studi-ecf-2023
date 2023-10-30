import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, private bdd: DatabaseService
  ) {
  }

  sessionValidate() {
    return this.bdd.post('users', '')
  }
}
