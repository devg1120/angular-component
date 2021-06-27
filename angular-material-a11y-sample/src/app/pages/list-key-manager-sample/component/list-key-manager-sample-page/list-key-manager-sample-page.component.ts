import {Component} from '@angular/core';

@Component({
  selector: 'app-list-key-manager-sample',
  templateUrl: './list-key-manager-sample-page.component.html',
  styleUrls: ['./list-key-manager-sample-page.component.scss'],
})
export class ListKeyManagerSamplePageComponent {
  itemLabel = '選択してください';
  fruits = [
    'Apples',
    'Bananas',
    'Cherries',
    'Dewberries',
    'Blueberries',
    'Avocados',
  ];
  isVisibleListItem = false;

  onClickButton(): void {
    this.isVisibleListItem = !this.isVisibleListItem;
  }
}
