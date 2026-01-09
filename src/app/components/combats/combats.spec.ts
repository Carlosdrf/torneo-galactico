import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Combats } from './combats';

describe('Combats', () => {
  let component: Combats;
  let fixture: ComponentFixture<Combats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Combats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Combats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
