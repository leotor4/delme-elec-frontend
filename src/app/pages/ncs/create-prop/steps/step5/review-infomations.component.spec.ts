import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInfomationsComponent } from './review-infomations.component';

describe('ReviewInfomationsComponent', () => {
  let component: ReviewInfomationsComponent;
  let fixture: ComponentFixture<ReviewInfomationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewInfomationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewInfomationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
