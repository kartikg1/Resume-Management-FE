import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjDetailsComponent } from './prj-details.component';

describe('PrjDetailsComponent', () => {
  let component: PrjDetailsComponent;
  let fixture: ComponentFixture<PrjDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
