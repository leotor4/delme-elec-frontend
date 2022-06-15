import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosNCComponent } from './dados-nc.component';

describe('DadosNCComponent', () => {
  let component: DadosNCComponent;
  let fixture: ComponentFixture<DadosNCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosNCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
