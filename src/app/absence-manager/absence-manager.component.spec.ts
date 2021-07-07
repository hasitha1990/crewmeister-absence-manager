import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceManagerComponent } from './absence-manager.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogModule } from "@angular/material/dialog";

describe('AbsenceManagerComponent', () => {
  let component: AbsenceManagerComponent;
  let fixture: ComponentFixture<AbsenceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceManagerComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
