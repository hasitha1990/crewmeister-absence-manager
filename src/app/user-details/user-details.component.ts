import { Component, Inject, OnInit } from '@angular/core';
import { getAbsenceStatus, getDateString, getTime } from "../shared/util";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Absence, Member } from "../shared/model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  getAbsenceStatus = getAbsenceStatus;
  getDateString = getDateString;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      member: Member,
      absence: Absence,
    }) {
  }

  ngOnInit(): void {
  }

  getDuration(): string {
    if(this.data.absence) {
      return `${((getTime(this.data.absence.endDate) - getTime(this.data.absence.startDate)) / (1000 * 3600 * 24) + 1)}`;
    }
    return '';
  }

}
