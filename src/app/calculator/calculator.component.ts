import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  spaces: number = 0;
  yDemand: number = 0;
  jDemand: number = 0;
  fDemand: number = 0;
  flightDurationHours: number = 0;
  flightDurationMinutes: number = 0;

  totalYSeatsProportional: number = 0;
  totalJSeatsProportional: number = 0;
  totalFSeatsProportional: number = 0;
  ySeatsPerFlight: number = 0;
  jSeatsPerFlight: number = 0;
  fSeatsPerFlight: number = 0;
  flightsPerDay: number = 0;

  calculate() {
    const flightDuration = `${this.flightDurationHours}:${this.flightDurationMinutes}`;
    [
      this.totalYSeatsProportional,
      this.totalJSeatsProportional,
      this.totalFSeatsProportional,
      this.ySeatsPerFlight,
      this.jSeatsPerFlight,
      this.fSeatsPerFlight,
      this.flightsPerDay
    ] = this.calculateSeats(
      this.spaces,
      this.yDemand,
      this.jDemand,
      this.fDemand,
      flightDuration
    );
  }

  private calculateSeats(
    spaces: number, 
    yDemand: number, 
    jDemand: number, 
    fDemand: number, 
    flightDuration: string
  ): [number, number, number, number, number, number, number] {
    const [hours, minutes] = flightDuration.split(':').map(Number);
    const flightDurationMinutes = hours * 60 + minutes;
    const totalMinutesInDay = 24 * 60;
    const flightsPerDay = Math.floor(totalMinutesInDay / flightDurationMinutes);

    const totalDemandInSpaces = yDemand * 1 + jDemand * 2 + fDemand * 3;
    const yProportion = yDemand / totalDemandInSpaces;
    const jProportion = (jDemand * 2) / totalDemandInSpaces;
    const fProportion = (fDemand * 3) / totalDemandInSpaces;

    let allocatedYSpaces = Math.floor(yProportion * spaces);
    let allocatedJSpaces = Math.floor(jProportion * spaces);
    let allocatedFSpaces = Math.floor(fProportion * spaces);

    let ySeats = Math.floor(allocatedYSpaces / 1);
    let jSeats = Math.floor(allocatedJSpaces / 2);
    let fSeats = Math.floor(allocatedFSpaces / 3);

    let totalUsedSpaces = ySeats * 1 + jSeats * 2 + fSeats * 3;
    let remainingSpaces = spaces - totalUsedSpaces;

    while (remainingSpaces > 0) {
        if (remainingSpaces >= 3 && fSeats < fDemand) {
            fSeats += 1;
            remainingSpaces -= 3;
        } else if (remainingSpaces >= 2 && jSeats < jDemand) {
            jSeats += 1;
            remainingSpaces -= 2;
        } else if (remainingSpaces >= 1 && ySeats < yDemand) {
            ySeats += 1;
            remainingSpaces -= 1;
        } else {
            break;
        }
    }

    const totalYSeatsProportional = ySeats;
    const totalJSeatsProportional = jSeats;
    const totalFSeatsProportional = fSeats;

    ySeats = 0;
    jSeats = 0;
    fSeats = 0;
    remainingSpaces = spaces;

    const fSeatsPerFlight = Math.min(Math.floor(fDemand / flightsPerDay), Math.floor(spaces / 3));
    fSeats = fSeatsPerFlight;

    remainingSpaces = spaces - fSeatsPerFlight * 3;

    const jSeatsPerFlight = Math.min(Math.floor(jDemand / flightsPerDay), Math.floor(remainingSpaces / 2));
    jSeats = jSeatsPerFlight;

    remainingSpaces -= jSeatsPerFlight * 2;

    const ySeatsPerFlight = Math.min(yDemand, remainingSpaces);
    ySeats = ySeatsPerFlight;

    return [
        totalYSeatsProportional, 
        totalJSeatsProportional, 
        totalFSeatsProportional, 
        ySeats, 
        jSeats, 
        fSeats,
        flightsPerDay
    ];
  }
}
