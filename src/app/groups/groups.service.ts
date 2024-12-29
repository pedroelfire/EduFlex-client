import { environment } from "../enviroments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalService } from "../shared/storage.service";
import { alumnsInGroupAndNotInGroupResponse, CreateGroup, Group, groupDetail } from "./groups.model";
import { Alumn, AlumnCriteria } from "../alumns/alumns.model";
import { createCriteria } from "../criteria/criteria.model";

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
  getGroupDetails(group_id:number):Observable<groupDetail>{
    return this.http.get<groupDetail>(this.apiUrl + "/getGroupDetails/" + group_id, this.getHttpOptions());
  }
  updateGroupDetails(alumns:AlumnCriteria[]){
    return this.http.put(this.apiUrl + "/updateStudentCriteria", alumns, this.getHttpOptions())
  }
  deleteAlumnFromGroup(alumn_id: Alumn['alumn_id'], group_id:Group['group_id']){
    return this.http.delete(this.apiUrl + "/" + group_id + "/alumn/" + alumn_id, this.getHttpOptions())
  }

  downloadAlumnsGrades(group_id: Group['group_id']) {
    return this.http.get(this.apiUrl + "/downloadGroupGrades/" + group_id, {
      responseType: 'arraybuffer',
      headers: this.getHttpOptions().headers
    });
  }
  getGroupCriteria(group_id:number):Observable<createCriteria[]>{
    return this.http.get<createCriteria[]>(this.apiUrl + "/getGroupCriteria/"
                                           + group_id, this.getHttpOptions());
  }
}
