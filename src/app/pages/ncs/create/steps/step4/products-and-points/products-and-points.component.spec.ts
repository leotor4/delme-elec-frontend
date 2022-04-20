import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsAndPointsComponent } from "./products-and-points.component";

describe("ProductsAndPointsComponent", () => {
  let component: ProductsAndPointsComponent;
  let fixture: ComponentFixture<ProductsAndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsAndPointsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAndPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
