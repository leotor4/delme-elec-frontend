import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewProductsAndPointsComponent } from "./view-products-and-points.component";

describe("ProductsAndPointsComponent", () => {
  let component: ViewProductsAndPointsComponent;
  let fixture: ComponentFixture<ViewProductsAndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductsAndPointsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsAndPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
