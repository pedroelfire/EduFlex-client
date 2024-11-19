import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAlumnsGroupDialogComponent } from './manage-alumns-group-dialog.component';

describe('ManageAlumnsGroupDialogComponent', () => {
  let component: ManageAlumnsGroupDialogComponent;
  let fixture: ComponentFixture<ManageAlumnsGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAlumnsGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAlumnsGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
