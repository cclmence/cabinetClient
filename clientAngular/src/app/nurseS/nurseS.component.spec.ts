import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSComponent } from './nurseS.component';

describe('NurseSComponent', () => {
  let component: NurseSComponent;
  let fixture: ComponentFixture<NurseSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseSComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
