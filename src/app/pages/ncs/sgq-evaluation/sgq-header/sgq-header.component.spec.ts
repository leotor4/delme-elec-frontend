import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgqHeaderComponent } from './sgq-header.component';

describe('SgqHeaderComponent', () => {
  let component: SgqHeaderComponent;
  let fixture: ComponentFixture<SgqHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgqHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgqHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
