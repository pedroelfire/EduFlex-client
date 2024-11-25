import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObvservationsComponent } from './obvservations.component';

describe('ObvservationsComponent', () => {
  let component: ObvservationsComponent;
  let fixture: ComponentFixture<ObvservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObvservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObvservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
