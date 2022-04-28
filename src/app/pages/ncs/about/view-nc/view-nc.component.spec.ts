import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNCComponent } from './view-nc.component';

describe('ViewNCComponent', () => {
  let component: ViewNCComponent;
  let fixture: ComponentFixture<ViewNCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
