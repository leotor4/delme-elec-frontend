import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgqStepperComponent } from './sgq-stepper.component';

describe('SgqStepperComponent', () => {
  let component: SgqStepperComponent;
  let fixture: ComponentFixture<SgqStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgqStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgqStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
