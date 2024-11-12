import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnsListComponent } from './alumns-list.component';

describe('AlumnsListComponent', () => {
  let component: AlumnsListComponent;
  let fixture: ComponentFixture<AlumnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
