import { TestBed } from '@angular/core/testing';
import { HeaderCellComponent } from './header-cell.component';

describe('HeaderCellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderCellComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderCellComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
