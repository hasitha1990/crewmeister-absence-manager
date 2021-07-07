import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Absence } from "../model";
import { environment } from "../../../environments/environment";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) { }

  getAllAbsences(): Observable<Absence[]>{
    return this.http.get<Absence[]>(`${environment.address}/absences`).pipe(
      shareReplay()
    );
  }
}
