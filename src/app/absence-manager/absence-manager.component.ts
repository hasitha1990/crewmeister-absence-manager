import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Absence, filterObject, Member } from "../shared/model";
import { AbsenceService } from "../shared/services/absence.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { MembersService } from "../shared/services/members.service";
import { map} from "rxjs/operators";
import { getAbsenceStatus, getDate } from "../shared/util";
import { getDateString } from "../shared/util";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { NgDialogAnimationService } from "ng-dialog-animation";


@Component({
  selector: 'app-absence-manager',
  templateUrl: './absence-manager.component.html',
  styleUrls: ['./absence-manager.component.scss']
})
export class AbsenceManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  $absenceObservable = new Observable<Absence[]>();
  $memberObservable = new Observable<Member>();

  // @ts-ignore
  absenceSubscription: Subscription;
  // @ts-ignore
  memberSubscription: Subscription;

  displayedColumns: string[] = ['userId', 'name', 'type', 'startDate', 'endDate', 'memberNote', 'status', 'admitterNote'];
  dataSource: MatTableDataSource<Absence> = new MatTableDataSource(<Absence[]>[]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // MatPaginator Inputs
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent = new PageEvent();

  filterOpen = false;
  filterObject = <filterObject>{}
  filterForm = new FormGroup({
    absenceType: new FormControl(),
    absenceDateRange: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    }),
  });

  memberList: Member[] = [];

  dataloaded = false;

  getAbsenceStatus = getAbsenceStatus;
  getDateString = getDateString;

  constructor(
    private absenceService: AbsenceService,
    private memberService: MembersService,
    public dialog: NgDialogAnimationService) {
    this.$absenceObservable = this.absenceService.getAllAbsences();
  }

  ngOnInit(): void {
    this.loadAllAbsences();
    this.setFilterPredicate();
    this.setPagination();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setPagination(){
    this.pageEvent.length = this.length;
    this.pageEvent.pageSize = this.pageSize;
  }

  loadAllAbsences(): void{
    this.absenceSubscription = this.$absenceObservable.pipe(
      map(absence => {
        absence.sort((a,b) => {
          return a.createdAt > b.createdAt? -1 : 1;
        });
        return absence;})
    ).subscribe((absence:Absence[]) => {
      this.dataSource.data = absence;
      this.dataSource.data.map((value: Absence, index: number) => {
        this.loadMember(value.userId, index);
      });
    });
  }

  loadMember(userId: number, index: number){
    let absenceMember = this.getMemberFromList(userId);

    if(!absenceMember) {

      this.memberSubscription = this.memberService.getMember(userId).subscribe(member => {
        this.memberList.push(member);
      }, error => {

      })
    }
    this.dataloaded = true;
  }

  getMemberFromList(userId: number): Member | undefined{
    return this.memberList.find((member) => member.userId === userId)
  }

  setFilterPredicate(): void{
    this.dataSource.filterPredicate = (data:Absence, filter: string):boolean => {
      let filterObject = <filterObject>JSON.parse(filter);

      return (this.validateFilterType(data, filterObject) && this.validateFilterDate(data, filterObject));
    };
  }

  validateFilterType(data:Absence, filterObject: filterObject): boolean{
    return ((filterObject.type === undefined || '') || data.type.trim().toLowerCase().includes(filterObject.type));
  }

  validateFilterDate(data:Absence, filterObject: filterObject): boolean{
    const filterStartDate = getDate(filterObject.dateRange?.start);
    const filterEndDate = getDate(filterObject.dateRange?.end);
    const startDate = getDate(data.startDate?.toString());
    const endDate = getDate(data.endDate?.toString());

    return ((filterObject.dateRange?.toString() === undefined || '')
      || (startDate >= filterStartDate && filterEndDate >= startDate)
      || (endDate >= filterStartDate && filterEndDate >= endDate));
  }

  toggleFilterPanel(): void{
    this.filterOpen = !this.filterOpen;
  }

  setFilterType(filter: Event): void {
    this.filterObject.type = (<HTMLInputElement>filter.target).value.trim().toLowerCase();
    this.applyFilter(JSON.stringify(this.filterObject));
  }

  setFilterDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.filterObject.dateRange = <{ start: string; end: string; }>{};
    this.filterObject.dateRange.start = dateRangeStart?.value;
    this.filterObject.dateRange.end = dateRangeEnd?.value;
    this.applyFilter(JSON.stringify(this.filterObject));
  }

  applyFilter(filter:string){
    this.dataSource.filter = filter;
  }

  clearFilter() {
    this.filterObject = <filterObject>{};
    this.dataSource.filter = JSON.stringify(this.filterObject);
    this.filterForm.reset();
  }

  getUserName(userId: number):string {
    return <string>this.memberList.find(val => val.userId === userId)?.name;
  }

  ngOnDestroy(){
    this.absenceSubscription.unsubscribe();
    this.memberSubscription.unsubscribe();
  }

  showMemberDetails(row: Absence) {
    const member = this.getMemberFromList(row.userId);
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      panelClass: 'cm-dialog',
      data: {
        member:member,
        absence: row
      },
      animation:{to:"aside"},
      position: { rowEnd: "0" }
    });
  }
}
