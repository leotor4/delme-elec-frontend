import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcsCreateHeaderComponent } from './ncs-create-header.component';

describe('NcsCreateHeaderComponent', () => {
  let component: NcsCreateHeaderComponent;
  let fixture: ComponentFixture<NcsCreateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcsCreateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcsCreateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
