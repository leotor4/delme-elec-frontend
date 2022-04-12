import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingProductComponent } from './waiting-product.component';

describe('WaitingProductComponent', () => {
  let component: WaitingProductComponent;
  let fixture: ComponentFixture<WaitingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
