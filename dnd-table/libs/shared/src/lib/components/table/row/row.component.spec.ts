import { TestBed } from '@angular/core/testing';
import { RowComponent } from './row.component';

describe('RowComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RowComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
