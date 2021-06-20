import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentResults } from './student-results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public DisplayedColumns: string[] = ['name', 'class', 'marks', 'grade'];

  public StudentDataSource: BehaviorSubject<StudentResults[]>;

  public StudentData: StudentResults[] = [
    { name: 'John', class: 'Grade 6', marks: '300', grade: 'B' },
    { name: 'Charles', class: 'Grade 6', marks: '300', grade: 'B' },
    { name: 'Eunice', class: 'Grade 6', marks: '420', grade: 'A' },
    { name: 'Kate', class: 'Grade 6', marks: '410', grade: 'A-' },
    { name: 'Joe', class: 'Grade 6', marks: '310', grade: 'B-' },
    { name: 'Peter', class: 'Grade 6', marks: '200', grade: 'C' },
    { name: 'Henry', class: 'Grade 6', marks: '250', grade: 'C+' },
    { name: 'Paul', class: 'Grade 6', marks: '450', grade: 'A' },
    { name: 'Pius', class: 'Grade 6', marks: '400', grade: 'A-' },
    { name: 'Kenendy', class: 'Grade 6', marks: '150', grade: 'D' }
  ];

  constructor() {
    this.StudentDataSource = new BehaviorSubject<StudentResults[]>(
      this.StudentData
    );
  }
}
