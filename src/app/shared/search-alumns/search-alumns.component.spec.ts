import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlumnsComponent } from './search-alumns.component';

describe('SearchAlumnsComponent', () => {
  let component: SearchAlumnsComponent;
  let fixture: ComponentFixture<SearchAlumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAlumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAlumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
