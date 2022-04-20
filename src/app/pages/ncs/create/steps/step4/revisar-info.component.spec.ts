import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarInfoComponent } from './revisar-info.component';

describe('RevisarInfoComponent', () => {
  let component: RevisarInfoComponent;
  let fixture: ComponentFixture<RevisarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
