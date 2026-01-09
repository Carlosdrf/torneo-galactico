import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrchestrator } from './tab-orchestrator';

describe('TabOrchestrator', () => {
  let component: TabOrchestrator;
  let fixture: ComponentFixture<TabOrchestrator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOrchestrator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabOrchestrator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
