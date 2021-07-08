import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsenceManagerComponent } from './absence-manager.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatTableHarness } from "@angular/material/table/testing";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";

describe('AbsenceManagerComponent', () => {
  let component: AbsenceManagerComponent;
  let fixture: ComponentFixture<AbsenceManagerComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceManagerComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule, MatTableModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);
  });

  it('show spinner before data load', () => {
    expect(fixture.debugElement.query(By.css('.cm-spinner'))).toBeTruthy();
    component.dataloaded = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cm-spinner'))).toBeFalsy();

  });

  it('show table after data load and data length > 0', () => {
    expect(fixture.debugElement.query(By.css('.cm-table'))).toBeFalsy();
    component.dataloaded = true;
    component.dataSource.data.length = 1;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cm-table'))).toBeTruthy();

  });
});
