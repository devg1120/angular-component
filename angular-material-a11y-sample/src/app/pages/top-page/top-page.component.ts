import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss'],
})
export class TopPageComponent {
  readonly test = environment.test;
}
