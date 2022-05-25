import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcInfoClosingComponent } from './nc-info-closing.component';

describe('NcInfoClosingComponent', () => {
  let component: NcInfoClosingComponent;
  let fixture: ComponentFixture<NcInfoClosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcInfoClosingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcInfoClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
