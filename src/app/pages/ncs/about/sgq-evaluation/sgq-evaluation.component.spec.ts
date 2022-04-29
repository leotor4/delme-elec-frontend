import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SGQEvaluationComponent } from './sgq-evaluation.component';

describe('SGQEvaluationComponent', () => {
  let component: SGQEvaluationComponent;
  let fixture: ComponentFixture<SGQEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SGQEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SGQEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
