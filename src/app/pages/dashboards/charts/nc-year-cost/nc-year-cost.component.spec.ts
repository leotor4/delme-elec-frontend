import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcYearCostComponent } from './nc-year-cost.component';

describe('NcYearCostComponent', () => {
  let component: NcYearCostComponent;
  let fixture: ComponentFixture<NcYearCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcYearCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcYearCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
