import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcsCreateStepperComponent } from './ncs-create-stepper.component';

describe('NcsCreateStepperComponent', () => {
  let component: NcsCreateStepperComponent;
  let fixture: ComponentFixture<NcsCreateStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcsCreateStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcsCreateStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
