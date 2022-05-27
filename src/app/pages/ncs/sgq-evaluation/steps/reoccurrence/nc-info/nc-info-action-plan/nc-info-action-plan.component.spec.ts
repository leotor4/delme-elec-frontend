import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcInfoActionPlanComponent } from './nc-info-action-plan.component';

describe('NcInfoActionPlanComponent', () => {
  let component: NcInfoActionPlanComponent;
  let fixture: ComponentFixture<NcInfoActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcInfoActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcInfoActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
