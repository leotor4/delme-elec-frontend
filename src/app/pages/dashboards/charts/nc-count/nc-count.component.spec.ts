import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCountComponent } from './nc-count.component';

describe('NcCountComponent', () => {
  let component: NcCountComponent;
  let fixture: ComponentFixture<NcCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
