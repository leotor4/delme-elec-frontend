import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsWhyComponent } from './reasons-why.component';

describe('ReasonsWhyComponent', () => {
  let component: ReasonsWhyComponent;
  let fixture: ComponentFixture<ReasonsWhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonsWhyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsWhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
