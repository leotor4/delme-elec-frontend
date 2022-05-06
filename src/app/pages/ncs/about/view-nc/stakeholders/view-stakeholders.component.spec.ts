import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStakeholdersComponent } from './view-stakeholders.component';

describe('StakeholdersComponent', () => {
  let component: ViewStakeholdersComponent;
  let fixture: ComponentFixture<ViewStakeholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStakeholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
