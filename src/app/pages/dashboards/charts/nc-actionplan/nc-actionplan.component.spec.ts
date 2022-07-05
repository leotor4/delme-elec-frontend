import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcActionplanComponent } from './nc-actionplan.component';

describe('NcActionplanComponent', () => {
  let component: NcActionplanComponent;
  let fixture: ComponentFixture<NcActionplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcActionplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcActionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
