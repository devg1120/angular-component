import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskItemEditDialogComponent } from './task-item-edit-dialog/task-item-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskBoardComponent,
    TaskItemComponent,
    TaskItemEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
