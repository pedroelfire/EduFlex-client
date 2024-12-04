import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLandingTopbarComponent } from './app.landing-topbar.component';

describe('AppLandingTopbarComponent', () => {
  let component: AppLandingTopbarComponent;
  let fixture: ComponentFixture<AppLandingTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLandingTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLandingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
