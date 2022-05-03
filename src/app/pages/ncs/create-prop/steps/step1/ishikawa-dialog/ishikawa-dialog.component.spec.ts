import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshikawaDialogComponent } from './ishikawa-dialog.component';

describe('IshikawaDialogComponent', () => {
  let component: IshikawaDialogComponent;
  let fixture: ComponentFixture<IshikawaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IshikawaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IshikawaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
