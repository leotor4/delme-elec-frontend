import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcProductsComponent } from './nc-products.component';

describe('NcProductsComponent', () => {
  let component: NcProductsComponent;
  let fixture: ComponentFixture<NcProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
