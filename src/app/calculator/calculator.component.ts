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
    const ySpaces = Math.round(yProportion * spaces);
    const jSpaces = Math.round(jProportion * spaces);
    const fSpaces = Math.round(fProportion * spaces);

    // Convert spaces to seat numbers
    let ySeats = ySpaces;
    let jSeats = Math.floor(jSpaces / 2);
    let fSeats = Math.floor(fSpaces / 3);

    // Validate the distribution
    let totalUsedSpaces = ySeats + jSeats * 2 + fSeats * 3;

    // Adjust remaining spaces
    let remainingSpaces = spaces - totalUsedSpaces;

    while (remainingSpaces > 0) {
        if (remainingSpaces >= 3) {
            fSeats += 1;
            remainingSpaces -= 3;
        } else if (remainingSpaces >= 2) {
            jSeats += 1;
            remainingSpaces -= 2;
        } else {
            ySeats += 1;
            remainingSpaces -= 1;
        }
    }

    return [ySeats, jSeats, fSeats];
  }

  onCalculate() {
    [this.yResult, this.jResult, this.fResult] = this.calculateSeats(this.totalSpaces, this.yDemand, this.jDemand, this.fDemand);
  }
}
