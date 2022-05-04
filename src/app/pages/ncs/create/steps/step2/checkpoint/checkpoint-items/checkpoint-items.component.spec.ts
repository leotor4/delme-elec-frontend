import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpointItemsComponent } from './checkpoint-items.component';

describe('CheckpointItemsComponent', () => {
  let component: CheckpointItemsComponent;
  let fixture: ComponentFixture<CheckpointItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckpointItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
