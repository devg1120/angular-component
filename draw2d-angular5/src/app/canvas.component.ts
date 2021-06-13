import { Component, EventEmitter, Input, Output, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MissionService } from './mission.service';
import { Subscription } from 'rxjs';

import  * as jdoc1  from './jsonDocument1';
import  * as jdoc2  from './jsonDocument2';


declare let draw2d:any;

@Component({
  selector: 'canvas_base',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit, OnDestroy {

  result = '現在時刻は不明です。';
  canvas_ = null;
  vx = 999;
  vy = 999;


  // (1) 入力バインディングで親から子へデータを渡す

  @Input() title : string


  // (2) セッターによって入力プロパティの変更を傍受する

  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';


  // (3) ngOnChanges()によって入力プロパティの変更を傍受する

  @Input() major = 0;
  @Input() minor = 0;
  changeLog: string[] = [];


  // (4) 親が子のイベントをリッスンする

  @Input()  name2 = '';
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;


  // (5) ローカル変数 による親から子への相互作用

  intervalId = 0;
  message = '';
  seconds = 11;


  // (7) 親と子がサービスを介して通信する

  @Input() astronaut = '';
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  // (7) 親と子がサービスを介して通信する

  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }
  ngOnInit() {
    var canvas = new draw2d.Canvas("gfx_holder");
    this.canvas_ = canvas;
   // var canvas = new draw2d.Canvas("canvas");
    // https://github.com/freegroup/draw2d/issues/64
    /*
    canvas.fromDocumentToCanvasCoordinate = $.proxy(function(x, y) {
    return new draw2d.geo.Point(
    (x + window.pageXOffset - this.getAbsoluteX() + this.getScrollLeft())*this.zoomFactor,
    (y + window.pageYOffset - this.getAbsoluteY() + this.getScrollTop())*this.zoomFactor);
    },canvas);

    canvas.fromCanvasToDocumentCoordinate = $.proxy(function(x,y) {
    return new draw2d.geo.Point(
    ((x*(1/this.zoomFactor)) + this.getAbsoluteX() - this.getScrollLeft() - window. pageXOffset),
    ((y*(1/this.zoomFactor)) + this.getAbsoluteY() - this.getScrollTop() - window.pageYOffset));
    },canvas);
*/

    canvas.fromDocumentToCanvasCoordinate = function(x, y) {
    return new draw2d.geo.Point(
    (x + window.pageXOffset - this.getAbsoluteX() + this.getScrollLeft())*this.zoomFactor,
    (y + window.pageYOffset - this.getAbsoluteY() + this.getScrollTop())*this.zoomFactor);
    },canvas;

    canvas.fromCanvasToDocumentCoordinate = function(x,y) {
    return new draw2d.geo.Point(
    ((x*(1/this.zoomFactor)) + this.getAbsoluteX() - this.getScrollLeft() - window. pageXOffset),
    ((y*(1/this.zoomFactor)) + this.getAbsoluteY() - this.getScrollTop() - window.pageYOffset));
    },canvas;





    /*
    // Create two standard nodes for "start" and "end" and link
    // this figures with a standard Connector
    //
    var start = new draw2d.shape.node.Start();
    var end = new draw2d.shape.node.End();

    canvas.add(start, 80, 180);
    canvas.add(end, 450, 250);

    // Add a connection via API calls between Start and Stop
    //
    var connection = new draw2d.Connection();
    connection.setSource(start.getOutputPort(0));
    connection.setTarget(end.getInputPort(0));
    canvas.add(connection);
    */

    // unmarshal the JSON document into the canvas
    // (load)
    var reader = new draw2d.io.json.Reader();
    //reader.unmarshal(canvas, this.jsonDocument);
    reader.unmarshal(canvas, jdoc2.jsonDocument);
  
    // display the JSON document in the preview DIV
    //
    //draw2d.displayJSON(canvas);

  }
  onchange(e: any) {
    console.log("change:", e)
  }
  onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;

    //        var cmd = new draw2d.command.CommandMove(figure);
    //        cmd.setPosition(parseInt($("#property_position_x").val()),parseInt($("#property_position_y").val()));
    //       figure.getCanvas().getCommandStack().execute(cmd);
    let figure = this.canvas_.getFigure("ebfb35bb-5767-8155-c804-14bd48789dc21")
    let cmd = new draw2d.command.CommandMove(figure);
    cmd.setPosition(0,0);
    this.canvas_.getCommandStack().execute(cmd);
    this.vx = 0;
    this.vy = 0;

  }



  // (3) ngOnChanges()によって入力プロパティの変更を傍受する

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }

   // (4) 親が子のイベントをリッスンする

   vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }


   // (5) ローカル変数 による親から子への相互作用

   ngOnDestroy() { 
       this.clearTimer();
       this.subscription.unsubscribe();   
   }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private clearTimer() { clearInterval(this.intervalId); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }

  // (7) 親と子がサービスを介して通信する

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }

}
