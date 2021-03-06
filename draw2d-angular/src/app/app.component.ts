import { Component, OnInit } from '@angular/core';
import  * as jdoc1  from './jsonDocument1';
import  * as jdoc2  from './jsonDocument2';


declare let draw2d:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'draw2d-angular';

  jsonDocument =
    [
      {
        "type": "draw2d.shape.basic.Oval",
        "id": "5b4c74b0-96d1-1aa3-7eca-bbeaed5fffd7",
        "x": 237,
        "y": 236,
        "width": 93,
        "height": 38,
        "bgColor": [255,255,0]
      },
      {
        "type": "draw2d.shape.basic.Rectangle",
        "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
        "x": 225,
        "y": 97,
        "width": 201,
        "height": 82,
        "radius": 2,
        "bgColor": {"red":0, "green":255, "blue":0}
      },
      {
        "type": "draw2d.shape.basic.Rectangle",
        "id": "ebfb35bb-5767-8155-c804-14bda7759dc2",
        "x": 72,
        "y": 45,
        "width": 50,
        "height": 50,
        "radius": 15,
        "bgColor": "#ffffff"
      },
      {
          "type": "draw2d.shape.analog.OpAmp",
          "id": "ebfb35bb-5767-8155-c804-14bd48789dc21",
          "x": 72,
          "y": 45,
          "width": 100,
          "height": 100
        }
      ,
      {
          "type": "draw2d.shape.analog.OpAmp",
          "id": "ebfb35bb-5767-8155-c804-14bd48789dc22",
          "x": 72,
          "y": 45
        }
     ];

  ngOnInit() {
    var canvas = new draw2d.Canvas("gfx_holder");

    
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
    

    // unmarshal the JSON document into the canvas
    // (load)
    var reader = new draw2d.io.json.Reader();
    //reader.unmarshal(canvas, this.jsonDocument);
    reader.unmarshal(canvas, jdoc1.jsonDocument);
  
    // display the JSON document in the preview DIV
    //
    draw2d.displayJSON(canvas);

  }

}
