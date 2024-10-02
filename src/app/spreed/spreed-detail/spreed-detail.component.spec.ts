import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreedDetailComponent } from './spreed-detail.component';

describe('SpreedDetailComponent', () => {
  let component: SpreedDetailComponent;
  let fixture: ComponentFixture<SpreedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreedDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
