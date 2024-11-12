import { environment } from "../enviroments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Alumn, CreateAlumn } from "./alumns.model";
import { LocalService } from "../shared/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AlumnsService {
  private apiUrl = environment.apiUrl + "/alumns";

  constructor(
    private http: HttpClient,
    private localStorage: LocalService
  ) { }

  private getHttpOptions(): { headers: HttpHeaders, params?: HttpParams } {
    const token = this.localStorage.getData("token");
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
  }

  getAlumn(): Observable<Alumn[]> {
    return this.http.get<Alumn[]>(this.apiUrl, this.getHttpOptions());
  }

  insertAlumns(registerAlumns: CreateAlumn[]): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrl, {alumns:registerAlumns}, this.getHttpOptions());
  }
}
