export interface Member{
  "crewId": number,
  "id": number,
  "image": string,
  "name": String,
  "userId": number,
}

export interface Absence{
  "admitterId": number | null,
  "admitterNote": string,
  "confirmedAt": string | null,
  "createdAt": string,
  "crewId": number,
  "endDate": string,
  "id": number,
  "memberNote": string,
  "rejectedAt": string | null,
  "startDate": string,
  "type": string,
  "userId": number,
}

export interface filterObject{
  type: string,
  dateRange: {
    start: string,
    end: string,
  }
}
