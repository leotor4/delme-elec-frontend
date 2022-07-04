import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcReceptorComponent } from './nc-receptor.component';

describe('NcReceptorComponent', () => {
  let component: NcReceptorComponent;
  let fixture: ComponentFixture<NcReceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcReceptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcReceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
