import { environment } from "../enviroments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginInput, LoginToken, RegisterInput, RegisterResponse } from "./auth.model";
import { Token } from "@angular/compiler";

let httpOptions: { headers: HttpHeaders, params?: HttpParams } = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl + "/auth"  
  constructor(private http: HttpClient) { }

  login(loginInput: LoginInput): Observable<LoginToken> {
    return this.http.post<LoginToken>(this.apiUrl + "/login", loginInput, httpOptions);
  }

  regisrter(registerInput: RegisterInput): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl + "/register", registerInput, httpOptions);
  }

}
