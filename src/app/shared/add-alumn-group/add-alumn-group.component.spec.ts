import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnGroupComponent } from './add-alumn-group.component';

describe('AddAlumnGroupComponent', () => {
  let component: AddAlumnGroupComponent;
  let fixture: ComponentFixture<AddAlumnGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlumnGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
