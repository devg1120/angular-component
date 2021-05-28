import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { AppComponent } from './app.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
    interactionPlugin
    ]);

    @NgModule({
      declarations: [
          AppComponent
            ],
              imports: [
                  BrowserModule,
                      FullCalendarModule // register FullCalendar with you app
                        ],
                          providers: [],
                            bootstrap: [AppComponent]
                            })
                            export class AppModule { }
