import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Member} from "../model";
import { shareReplay } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(`${environment.address}/members`).pipe(
      shareReplay()
    );
  }

  getMember(id: number): Observable<Member>{
    return this.http.get<Member>(`${environment.address}/members/${id}`).pipe(
      shareReplay()
    );
  }
}
