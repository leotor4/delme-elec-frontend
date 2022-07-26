import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcSectorProposalComponent } from './nc-sector-proposal.component';

describe('NcSectorProposalComponent', () => {
  let component: NcSectorProposalComponent;
  let fixture: ComponentFixture<NcSectorProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcSectorProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcSectorProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
