import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstPanelComponent } from './my-first-panel.component';

describe('MyFirstPanelComponent', () => {
  let component: MyFirstPanelComponent;
  let fixture: ComponentFixture<MyFirstPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFirstPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirstPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
