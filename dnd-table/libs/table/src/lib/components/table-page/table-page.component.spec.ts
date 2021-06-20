import { TestBed } from '@angular/core/testing';
import { TablePageComponent } from './table-page.component';
import { DataService } from '../../services/data.service';
import { Observable, of } from 'rxjs';
import { TableEntity, TableFacade } from '@app/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TableEffects } from '../../state/table/table.effects';
import { DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@app/shared';

@Injectable()
class DataServiceMock extends DataService {
  getUsers(): Observable<TableEntity[]> {
    return of([]);
  }
}

describe('TablePageComponent', () => {
  let actions: Observable<any>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePageComponent],
      providers: [
        TableEffects,
        TableFacade,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: DataService,
          useClass: DataServiceMock
        }
      ],
      imports: [HttpClientTestingModule, SharedModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TablePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
