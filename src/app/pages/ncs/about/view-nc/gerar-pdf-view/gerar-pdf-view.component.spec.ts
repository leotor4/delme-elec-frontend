import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarPdfViewComponent } from './gerar-pdf-view.component';

describe('GerarPdfViewComponent', () => {
  let component: GerarPdfViewComponent;
  let fixture: ComponentFixture<GerarPdfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarPdfViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
