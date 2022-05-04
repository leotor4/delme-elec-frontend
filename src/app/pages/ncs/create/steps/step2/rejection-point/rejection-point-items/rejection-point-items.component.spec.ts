import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionPointItemsComponent } from './rejection-point-items.component';

describe('RejectionPointItemsComponent', () => {
  let component: RejectionPointItemsComponent;
  let fixture: ComponentFixture<RejectionPointItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionPointItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionPointItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
