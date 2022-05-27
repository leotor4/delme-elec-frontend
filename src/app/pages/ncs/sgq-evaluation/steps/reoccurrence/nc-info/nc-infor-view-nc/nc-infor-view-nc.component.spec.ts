import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcInforViewNcComponent } from './nc-infor-view-nc.component';

describe('NcInforViewNcComponent', () => {
  let component: NcInforViewNcComponent;
  let fixture: ComponentFixture<NcInforViewNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcInforViewNcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcInforViewNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
