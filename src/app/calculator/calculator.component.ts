import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  totalSpaces: number = 0;
  yDemand: number = 0;
  jDemand: number = 0;
  fDemand: number = 0;
  yResult: number = 0;
  jResult: number = 0;
  fResult: number = 0;

 calculateSeats(spaces: number, yDemand: number, jDemand: number, fDemand: number): [number, number, number] {
    // Calculate total space demand in Y space equivalents
    const totalDemand = yDemand * 1 + jDemand * 2 + fDemand * 3;

    // Calculate proportions
    const yProportion = yDemand / totalDemand;
    const jProportion = (jDemand * 2) / totalDemand;
    const fProportion = (fDemand * 3) / totalDemand;

    // Allocate spaces based on proportions
    let ySpaces = yProportion * spaces;
    let jSpaces = jProportion * spaces;
    let fSpaces = fProportion * spaces;

    // Convert spaces to seat numbers
    let ySeats = Math.floor(ySpaces);
    let jSeats = Math.floor(jSpaces / 2);
    let fSeats = Math.floor(fSpaces / 3);

    // Validate the distribution
    let totalUsedSpaces = ySeats + jSeats * 2 + fSeats * 3;

    // Adjust remaining spaces
    let remainingSpaces = spaces - totalUsedSpaces;

    // Adjust to ensure all spaces are used proportionally
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

    return [ySeats, jSeats, fSeats];
}

  onCalculate() {
    [this.yResult, this.jResult, this.fResult] = this.calculateSeats(this.totalSpaces, this.yDemand, this.jDemand, this.fDemand);
  }
}
