import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcInfoSgqComponent } from './nc-info-sgq.component';

describe('NcInfoSgqComponent', () => {
  let component: NcInfoSgqComponent;
  let fixture: ComponentFixture<NcInfoSgqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcInfoSgqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcInfoSgqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
