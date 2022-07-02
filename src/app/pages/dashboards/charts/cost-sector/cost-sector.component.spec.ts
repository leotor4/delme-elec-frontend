import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSectorComponent } from './cost-sector.component';

describe('CostSectorComponent', () => {
  let component: CostSectorComponent;
  let fixture: ComponentFixture<CostSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
