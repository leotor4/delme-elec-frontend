import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNcDialogComponent } from './add-nc-dialog.component';

describe('AddNcDialogComponent', () => {
  let component: AddNcDialogComponent;
  let fixture: ComponentFixture<AddNcDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNcDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
