import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcTypesComponent } from './nc-types.component';

describe('NcTypesComponent', () => {
  let component: NcTypesComponent;
  let fixture: ComponentFixture<NcTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
