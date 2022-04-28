import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdentifyNCComponent } from './view-identify-n-c.component';

describe('IdentifyNCComponent', () => {
  let component: ViewIdentifyNCComponent;
  let fixture: ComponentFixture<ViewIdentifyNCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIdentifyNCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdentifyNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
