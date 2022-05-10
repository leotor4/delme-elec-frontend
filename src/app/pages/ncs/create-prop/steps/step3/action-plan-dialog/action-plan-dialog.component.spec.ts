import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanDialogComponent } from './action-plan-dialog.component';

describe('ActionPlanDialogComponent', () => {
  let component: ActionPlanDialogComponent;
  let fixture: ComponentFixture<ActionPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
