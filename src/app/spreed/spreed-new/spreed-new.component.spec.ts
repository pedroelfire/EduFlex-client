import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreedNewComponent } from './spreed-new.component';

describe('SpreedNewComponent', () => {
  let component: SpreedNewComponent;
  let fixture: ComponentFixture<SpreedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreedNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
