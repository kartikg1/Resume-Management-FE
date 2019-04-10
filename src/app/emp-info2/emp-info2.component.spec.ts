import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInfo2Component } from './emp-info2.component';

describe('EmpInfo2Component', () => {
  let component: EmpInfo2Component;
  let fixture: ComponentFixture<EmpInfo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpInfo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
