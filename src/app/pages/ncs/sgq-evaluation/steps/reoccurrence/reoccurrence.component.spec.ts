import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReoccurrenceComponent } from './reoccurrence.component';

describe('ReoccurrenceComponent', () => {
  let component: ReoccurrenceComponent;
  let fixture: ComponentFixture<ReoccurrenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReoccurrenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReoccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
