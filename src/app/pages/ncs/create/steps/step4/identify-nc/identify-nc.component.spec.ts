import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyNCComponent } from './identify-nc.component';

describe('IdentifyNCComponent', () => {
  let component: IdentifyNCComponent;
  let fixture: ComponentFixture<IdentifyNCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifyNCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
