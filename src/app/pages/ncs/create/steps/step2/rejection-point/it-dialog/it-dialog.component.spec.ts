import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItDialogComponent } from './it-dialog.component';

describe('ItDialogComponent', () => {
  let component: ItDialogComponent;
  let fixture: ComponentFixture<ItDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
