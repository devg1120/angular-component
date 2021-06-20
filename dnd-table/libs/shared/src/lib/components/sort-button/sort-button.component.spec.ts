import { TestBed } from '@angular/core/testing';
import { SortButtonComponent } from './sort-button.component';

describe('SortButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortButtonComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SortButtonComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
