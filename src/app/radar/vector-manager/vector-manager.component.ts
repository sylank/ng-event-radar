import { MathUtils } from './math-utils';
import { EventRadarModel } from './../model/event-radar-model';
import { EventService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vector-manager',
  templateUrl: './vector-manager.component.html',
  styleUrls: ['./vector-manager.component.scss']
})
export class VectorManagerComponent implements OnInit {

  public destinations: Promise<boolean>;
  public dests: Array<EventRadarModel>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEventData().subscribe(
      (element) => {
        this.dests = element;


        console.log(this.dests);

        this.dests.forEach(e => {
          if (e.eventDistance >= 0 && e.eventDistance <= 10) {
            // walk
            e.color = '#669AD4';
          }

          if (e.eventDistance >= 10 && e.eventDistance <= 25) {
            // bike
            e.color = '#F9DD3E';
          }

          if (e.eventDistance >= 25) {
            // car
            e.color = '#1D8A99';
          }

        });

        console.log(this.dests);

        this.destinations = Promise.resolve(true);
      }
    );

  }

  generateCaptionStyle(angle, distance): any {
    const choords = MathUtils.calculateDestination(angle, distance, [50, 50]);

    const style = {
      'top': choords[1] + 'vh',
      'left': choords[0] + 'vh'
    };

    if (angle > 180) {
      style['margin-left'] = '20px';
    }

    return style;
  }

  generateVectorStyle(color, distance, angle) {
    const style = {
      'background': color,
      'overflow': 'visible',
      'width': distance + 'vh',
      'transform': 'rotate(' + (angle - 90) + 'deg)',
      'transform-origin': '0px 15px'
    };

    return style;
  }
}
