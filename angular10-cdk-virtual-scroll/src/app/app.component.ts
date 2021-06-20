import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppComponent {
  title = 'cdkScrollable';
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  items = Array.from({length: 50}).map((_, i) => `Item #${i}`);
  constructor(private scrollDispatcher: ScrollDispatcher) {
  }

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe(() => 
     console.log("scroll " , this.scrollable.getElementRef().nativeElement.scrollTop) )
  }

  scrollDown() {
    const top = this.scrollable.measureScrollOffset('top');
    console.log(this.scrollable.getElementRef().nativeElement);
   
    this.scrollable.scrollTo({
      top: top + 200
    });
  }
  scrollUp(){
    const top = this.scrollable.measureScrollOffset('top');
    this.scrollable.scrollTo({
      top: top - 200
    });
  }
}
