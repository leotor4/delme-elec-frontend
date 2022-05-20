import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInfoSGQComponent } from './review-info-sgq.component';

describe('ReviewInfoSGQComponent', () => {
  let component: ReviewInfoSGQComponent;
  let fixture: ComponentFixture<ReviewInfoSGQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewInfoSGQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewInfoSGQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
