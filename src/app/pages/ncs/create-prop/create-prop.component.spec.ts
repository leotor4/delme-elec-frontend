import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropComponent } from './create-prop.component';

describe('CreatePropComponent', () => {
  let component: CreatePropComponent;
  let fixture: ComponentFixture<CreatePropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
