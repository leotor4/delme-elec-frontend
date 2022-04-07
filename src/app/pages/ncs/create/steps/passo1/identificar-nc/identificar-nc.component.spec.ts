import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificarNcComponent } from './identificar-nc.component';

describe('IdentificarNcComponent', () => {
  let component: IdentificarNcComponent;
  let fixture: ComponentFixture<IdentificarNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificarNcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificarNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
