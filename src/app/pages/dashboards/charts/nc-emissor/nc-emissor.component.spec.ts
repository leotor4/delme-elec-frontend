import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcEmissorComponent } from './nc-emissor.component';

describe('NcEmissorComponent', () => {
  let component: NcEmissorComponent;
  let fixture: ComponentFixture<NcEmissorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcEmissorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcEmissorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
