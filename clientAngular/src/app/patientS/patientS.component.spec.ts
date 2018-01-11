import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSComponent } from './patientS.component';

describe('PatientSComponent', () => {
  let component: PatientSComponent;
  let fixture: ComponentFixture<PatientSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
