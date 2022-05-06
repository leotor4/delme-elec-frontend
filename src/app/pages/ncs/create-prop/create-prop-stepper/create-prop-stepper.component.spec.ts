import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropStepperComponent } from './create-prop-stepper.component';

describe('CreatePropStepperComponent', () => {
  let component: CreatePropStepperComponent;
  let fixture: ComponentFixture<CreatePropStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
