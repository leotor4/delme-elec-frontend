import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcStatusComponent } from './nc-status.component';

describe('NcStatusComponent', () => {
  let component: NcStatusComponent;
  let fixture: ComponentFixture<NcStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
