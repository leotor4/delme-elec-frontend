import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentoDialogComponent } from './fechamento-dialog.component';


describe('FechamentoDialogComponent', () => {
  let component: FechamentoDialogComponent;
  let fixture: ComponentFixture<FechamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechamentoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
