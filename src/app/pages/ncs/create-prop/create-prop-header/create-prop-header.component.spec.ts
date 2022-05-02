import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropHeaderComponent } from './create-prop-header.component';

describe('CreatePropHeaderComponent', () => {
  let component: CreatePropHeaderComponent;
  let fixture: ComponentFixture<CreatePropHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
