import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTable from './state/table/table.reducer';
import { TableEffects } from './state/table/table.effects';
import { TableFacade } from './state/table/table.facade';

import { SharedModule } from '@app/shared';

import { TablePageComponent } from './components';
import { TableRoutingModule } from './table-routing.module';

const COMPONENTS = [
  TablePageComponent
]

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTable.TABLE_FEATURE_KEY, fromTable.reducer),
    EffectsModule.forFeature([TableEffects]),
    SharedModule,
    TableRoutingModule
  ],
  declarations: [...COMPONENTS],
  providers: [TableFacade],
})
export class TableModule {}
