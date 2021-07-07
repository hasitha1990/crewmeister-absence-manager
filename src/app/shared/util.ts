import {Absence} from "./model";

export function getAbsenceStatus(absence: Absence):string {
  if(absence.confirmedAt?.toString() !== undefined || ''){
    return 'Confirmed';
  }else if(absence.rejectedAt?.toString() !== undefined || ''){
    return 'Rejected';
  }
  return 'Requested';
}

export function getDate(date: string): Date {
  return new Date(date);
}

export function getTime(date: string): number{
  return getDate(date).getTime();
}

export function getDateString(date: string): string {
  const newDate = getDate(date);
  return `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
}
