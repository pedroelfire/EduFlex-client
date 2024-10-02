import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreedListComponent } from './spreed-list.component';

describe('SpreedListComponent', () => {
  let component: SpreedListComponent;
  let fixture: ComponentFixture<SpreedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
