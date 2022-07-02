import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcYearComponent } from './nc-year.component';

describe('NcYearComponent', () => {
  let component: NcYearComponent;
  let fixture: ComponentFixture<NcYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
