import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcInfoComponent } from './nc-info.component';

describe('NcInfoComponent', () => {
  let component: NcInfoComponent;
  let fixture: ComponentFixture<NcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
