import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcReceptorEmissorComponent } from './nc-receptor-emissor.component';

describe('NcReceptorEmissorComponent', () => {
  let component: NcReceptorEmissorComponent;
  let fixture: ComponentFixture<NcReceptorEmissorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcReceptorEmissorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcReceptorEmissorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
