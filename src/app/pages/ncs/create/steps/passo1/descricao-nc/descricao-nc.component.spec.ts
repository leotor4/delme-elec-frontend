import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoNcComponent } from './descricao-nc.component';

describe('DescricaoNcComponent', () => {
  let component: DescricaoNcComponent;
  let fixture: ComponentFixture<DescricaoNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoNcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
