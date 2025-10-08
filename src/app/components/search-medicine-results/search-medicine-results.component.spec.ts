import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedicineResultsComponent } from './search-medicine-results.component';

describe('SearchMedicineResultsComponent', () => {
  let component: SearchMedicineResultsComponent;
  let fixture: ComponentFixture<SearchMedicineResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMedicineResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMedicineResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
