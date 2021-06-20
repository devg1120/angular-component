import { TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CellComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
