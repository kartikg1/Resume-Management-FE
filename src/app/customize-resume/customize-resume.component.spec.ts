import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeResumeComponent } from './customize-resume.component';

describe('CustomizeResumeComponent', () => {
  let component: CustomizeResumeComponent;
  let fixture: ComponentFixture<CustomizeResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
