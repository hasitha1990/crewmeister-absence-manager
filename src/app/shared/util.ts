import { Absence, Member } from "./model";

export function getAbsenceStatus(absence: Absence | undefined):string {
  if(absence?.confirmedAt?.toString() !== undefined || ''){
    return 'Confirmed';
  }else if(absence?.rejectedAt?.toString() !== undefined || ''){
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

export function getDateString(date: string | undefined): string {
  if(date) {
    const newDate = getDate(date);
    return `${newDate.toISOString().slice(0,10)}`;
  }
  return '';
}

export function getMemberFromList(userId: number, memberList: Member[]): Member | undefined{
  return memberList.find((member) => member.userId === userId)
}
