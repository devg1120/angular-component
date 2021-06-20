import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TableEntity } from '@app/table';
import { Column } from '@app/shared';

@Injectable({providedIn: 'root'})
export class DataService {

  private columns: Column[] = [
    {
      headerName: 'ID',
      field: 'id',
      width: 30,
      minWidth: 30,
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      width: 200,
      resizable: true,
    },
    {
      headerName: 'Username',
      field: 'username',
      sortable: true,
      width: 150,
      resizable: true,
    },
    {
      headerName: 'User E-Mail',
      field: 'email',
      width: 220,
    }
  ];
  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<TableEntity[]> {
    return this.httpClient.get<TableEntity[]>('https://jsonplaceholder.typicode.com/users')
  }

  getColumns(): Observable<Column[]> {
    return of(this.columns);
  }
}
