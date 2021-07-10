import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemEditDialogComponent } from './task-item-edit-dialog.component';

describe('TaskItemEditDialogComponent', () => {
  let component: TaskItemEditDialogComponent;
  let fixture: ComponentFixture<TaskItemEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
