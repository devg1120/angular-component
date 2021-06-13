import { Component, OnInit,  AfterViewInit, ViewChild } from '@angular/core';
//import {MatButtonModule} from '@angular/material/button';
//import {MatInputModule} from '@angular/material/input';


import { CanvasComponent}  from './canvas.component';
import { MissionService } from './mission.service';


//import  * as jdoc1  from './jsonDocument1';
//import  * as jdoc2  from './jsonDocument2';


//declare let draw2d:any;

@Component({
  selector: 'app-root',
  providers: [MissionService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,  AfterViewInit {
  title = 'draw2d-angular';
  result = '現在時刻は不明です。';
  canvas_ = null;
  vx = 999;
  vy = 999;
  XYZ = "xyz zbc ";
  NAME = "GUSA";
  
  major = 1;
  minor = 23;

  agreed = 0;
  disagreed = 0;
  voters = ['Narco', 'Celeritas', 'Bombasto'];

  // (6) 親が @ViewChild() を呼び出す

  @ViewChild(CanvasComponent, { static:false})
  private canvasComponent!: CanvasComponent;

  // (7) 親と子がサービスを介して通信する

  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;



  // (7) 親と子がサービスを介して通信する

  constructor(private missionService: MissionService) {
      missionService.missionConfirmed$.subscribe(
      astronaut => {
                   this.history.push(`${astronaut} confirmed the mission`);
                 });
  }


  ngOnInit() {

  }
  onchange(e: any) {
    console.log("change:", e)
  }
  onclick() {
    this.result = `現在時刻は、${new Date().toLocaleTimeString()}です。`;

    //let figure = this.canvas_.getFigure("ebfb35bb-5767-8155-c804-14bd48789dc21")
    //let cmd = new draw2d.command.CommandMove(figure);
    //cmd.setPosition(0,0);
    //this.canvas_.getCommandStack().execute(cmd);
    this.vx = 0;
    this.vy = 0;

  }
  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }

  // (6) 親が @ViewChild() を呼び出す

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.canvasComponent.seconds, 0);
  }

  start() { this.canvasComponent.start(); }
  stop() { this.canvasComponent.stop(); }

  // (7) 親と子がサービスを介して通信する

  announce() {
      const mission = this.missions[this.nextMission++];
      this.missionService.announceMission(mission);
      this.history.push(`Mission "${mission}" announced`);
      if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
   }

}
