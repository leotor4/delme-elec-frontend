import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacaoDaNcComponent } from './identificacao-da-nc.component';

describe('IdentificacaoDaNcComponent', () => {
  let component: IdentificacaoDaNcComponent;
  let fixture: ComponentFixture<IdentificacaoDaNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacaoDaNcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacaoDaNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
