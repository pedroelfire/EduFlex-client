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

  deleteAlumns(alumnsIds: Alumn['alumn_id'][]): Observable<string> {
    const params = new HttpParams().set('ids', JSON.stringify(alumnsIds))
    return this.http.delete<string>(this.apiUrl, {params, ...this.getHttpOptions()});
  }

  suggestedAlumns(name: string = '', exclutions:Alumn['alumn_id'][] = []): Observable<Alumn[]> {
    const params = new HttpParams().set('name', name).set('exclutions',JSON.stringify(exclutions))
    return this.http.get<Alumn[]>(this.apiUrl + '/suggestedAlumns', {params, ...this.getHttpOptions()});
  }

  updateAlumns(alumn:Alumn){
    return this.http.put(this.apiUrl + '/' + alumn.alumn_id, {alumn}, this.getHttpOptions());
  }
}
