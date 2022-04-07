import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionPointComponent } from './rejection-point.component';

describe('RejectionPointComponent', () => {
  let component: RejectionPointComponent;
  let fixture: ComponentFixture<RejectionPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
