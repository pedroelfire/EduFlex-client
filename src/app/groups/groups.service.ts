import { environment } from "../enviroments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalService } from "../shared/storage.service";
import { alumnsInGroupAndNotInGroupResponse, CreateGroup, Group } from "./groups.model";
import { Alumn } from "../alumns/alumns.model";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private apiUrl = environment.apiUrl + "/groups";

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

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl, this.getHttpOptions());
  }

  insertGroup(registerGroup: CreateGroup): Observable<number> {
    return this.http.post<number>(this.apiUrl, registerGroup, this.getHttpOptions());
  }

  alumnsInGroup(group_id: Group['group_id']): Observable<Alumn[]> {
    return this.http.get<Alumn[]>(this.apiUrl + "/alumnsInGroup/" + group_id, this.getHttpOptions());
  }

  alumnsInGroupAndNotInGroup(group_id: Group['group_id']): Observable<alumnsInGroupAndNotInGroupResponse> {
    return this.http.get<alumnsInGroupAndNotInGroupResponse>(this.apiUrl + "/alumnsInGroupAndNotInGroup/" + group_id, this.getHttpOptions());
  }
}
