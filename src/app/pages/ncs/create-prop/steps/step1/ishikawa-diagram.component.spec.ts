import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshikawaDiagramComponent } from './ishikawa-diagram.component';

describe('IshikawaDiagramComponent', () => {
  let component: IshikawaDiagramComponent;
  let fixture: ComponentFixture<IshikawaDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IshikawaDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IshikawaDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
