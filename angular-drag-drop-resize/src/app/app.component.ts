import { CdkDragDrop, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, NgZone, QueryList, ViewChildren } from '@angular/core';
import { CardControl } from "./card.model";
import { Control } from './control.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dragDisabled = false;

  sidebarCards: Control[] = [
    { width: 200, height: 200, index: 0, xAxis: 1, yAxis: 1, cardType: "watchlist" },
    { width: 200, height: 200, index: 1, xAxis: 2, yAxis: 2, cardType: "open entries table" },
    { width: 200, height: 200, index: 2, xAxis: 3, yAxis: 3, cardType: "trade-performance-chart" },
    { width: 200, height: 200, index: 3, xAxis: 3, yAxis: 4, cardType: "strategies" },
  ];

  dragPosition;

  selectedControl?: Control;
  controls?: Control[];
  cardControls?: CardControl[];
  lockAxis?: any = 'x|y'
  @ViewChildren('resizeBox') resizeBox?: QueryList<ElementRef>;
  @ViewChildren('dragHandleLT') dragHandleLT?: QueryList<ElementRef>;
  @ViewChildren('dragHandleRT') dragHandleRT?: QueryList<ElementRef>;
  @ViewChildren('dragHandleLB') dragHandleLB?: QueryList<ElementRef>;
  @ViewChildren('dragHandleRB') dragHandleRB?: QueryList<ElementRef>;


  constructor(private zone: NgZone) {
    this.cardControls = [];
  }

  ngOnInit(): void {
    try {
      const cards = JSON.parse(localStorage.getItem('controls'));
      // this.controls = (cards) ? cards : [];
      this.controls = [];
    } catch (e) {

    }
  }

  ngAfterViewInit(): void {
  }



  addWatchlist(type: string): void {
    const tc = new Control();
    tc.width = (type === 'watchlist') ? 300 : 500;
    tc.height = 300;
    tc.xAxis = 0;
    tc.yAxis = 0;
    tc.cardType = type;
    tc.dragFreePosition = {
      x: 0,
      y: 0
    }

    tc.index = this.controls === undefined ? 0 : this.controls.length;

    this.controls.push(tc);
    this.selectedControl = tc;
    this.setCreateHandleTransform();

  }

  setCreateHandleTransform(): void {
    let rect: any = null;
    this.resizeBox!.changes.subscribe(() => {
      rect = this.resizeBox!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement.getBoundingClientRect();

      this.setupContainerBoundary(rect.left, rect.top, 0, 0)

      this.dragHandleRB!.changes.subscribe(() => {
        this.setHandleTransform(this.dragHandleRB!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement, rect, 'both');
      });
    });
  }

  dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>, control: Control): void {
    // this.selectedControl = control;
    this.zone.runOutsideAngular(() => {
      this.resize(dragHandle, this.resizeBox!.filter((element, index) => index === control.index!)[0].nativeElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement): void {
    const dragRect = dragHandle.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // console.table({
    //   mouseX: this.mouse.x,
    //   containerPosRight: this.containerPos.right,
    //   mouseY: this.mouse.y,
    //   containerPosBottom: this.containerPos.bottom,
    //   boxLeft: this.boxPosition.left,
    //   boxTop: this.boxPosition.top,
    //   canResize: this.resizeCondMeet(),
    // })
    // console.warn(this.resizeCondMeet());
    // // this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom
    // if (this.resizeCondMeet()) {
    //   const width = dragRect.left - targetRect.left + dragRect.width;
    //   const height = dragRect.top - targetRect.top + dragRect.height;
    //   target.style.width = width + 'px';
    //   target.style.height = height + 'px';

    //   this.setUpdateHandleTransform();
    // } else {
    //   // console.warn('no space left')
    // }

    if (this.resizeCondMeet()) {
      const width = dragRect.left - targetRect.left + dragRect.width;
      const height = dragRect.top - targetRect.top + dragRect.height;
      target.style.width = width + 'px';
      target.style.height = height + 'px';

      this.setUpdateHandleTransform();
    }

  }

  dragger(event: CdkDragEnd, control: Control) {
    console.warn(this.resizeBox)
    let i = control.index;
    let aw: HTMLElement = this.resizeBox!.filter((element, index) => index === control.index!)[0].nativeElement;
    this.controls[i].width = aw.getBoundingClientRect().width;
    this.controls[i].height = aw.getBoundingClientRect().height;
    localStorage.setItem("controls", JSON.stringify(this.controls));

    const { left, top } = aw.getBoundingClientRect();

    this.setupContainerBoundary(left, top, control.xAxis, control.yAxis);
  }

  dragEnd(event: CdkDragEnd, control: Control) {
    let aw: HTMLElement = this.resizeBox!.filter((element, index) => index === control.index!)[0].nativeElement;

    let i = control.index;
    let { x, y } = event.source.getFreeDragPosition();
    this.controls[i].xAxis = x;
    this.controls[i].yAxis = y;
    this.controls[i].width = aw.getBoundingClientRect().width;
    this.controls[i].height = aw.getBoundingClientRect().height;
    this.controls[i].dragFreePosition = {
      x: x,
      y: y
    }

    localStorage.setItem("controls", JSON.stringify(this.controls));
  }


  public mouse: { x: number, y: number }
  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.zone.runOutsideAngular(() => {
      this.mouse = { x: event.clientX, y: event.clientY };
    })
    // if (this.status == 1) {
    //   this.resizes();
    // }
    // this.mouse = { x: event.clientX, y: event.clientY };

    // if(this.status === Status.RESIZE) this.resize();
    // else if(this.status === Status.MOVE) this.move();
  }

  status = 0;
  setStatus(event: MouseEvent, status: number) {
    if (status === 1) {
      this.status = status;

      event.stopPropagation();
    }
  }

  width = 300;
  height = 300;
  private resizes() {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
      console.warn(this.width, this.height)
    }
  }



  private resizeCondMeet() {
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }


  private setupContainerBoundary(clientBoundRectLeft, clientBoundRectTop, xAxis, yAxis) {

    this.boxPosition = {
      left: clientBoundRectLeft,
      top: clientBoundRectTop
    };

    const left = this.boxPosition.left - xAxis;
    const top = this.boxPosition.top - yAxis;
    const right = left + 650;
    const bottom = top + 400;

    this.containerPos = { left, top, right, bottom };
  }

  clickControl(control: Control): void {
    this.selectedControl = control;
  }

  setUpdateHandleTransform(): void {
    // console.warn('called')
    const rect = this.resizeBox!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement.getBoundingClientRect();
    // this.setHandleTransform(this.dragHandleLT!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement, rect, 'x');
    // this.setHandleTransform(this.dragHandleRT!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement, rect, 'both');
    // this.setHandleTransform(this.dragHandleLB!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement, rect, 'both');
    this.setHandleTransform(this.dragHandleRB!.filter((element, index) => index === this.selectedControl!.index!)[0].nativeElement, rect, 'both');

  }

  setHandleTransform(dragHandle: HTMLElement, targetRect: ClientRect | DOMRect, position: 'x' | 'y' | 'both'): void {
    const dragRect = dragHandle.getBoundingClientRect();
    const translateX = targetRect.width - dragRect.width;
    const translateY = targetRect.height - dragRect.height;

    // if (position === 'x') {
    //   dragHandle.style.transform = `translate3d(${translateX}px, 0, 0)`;
    // }

    // if (position === 'y') {
    //   dragHandle.style.transform = `translate3d(0, ${translateY}px, 0)`;
    // }

    if (position === 'both') {
      dragHandle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  }


  onDropList(event: CdkDragDrop<any[]>) {
    this.addWatchlist('watchlist')
  }

}
