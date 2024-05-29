import { Component } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {
  verticalButtons = Array(5).fill(null);
  gridButtons = Array(28).fill(null); // 7 columns * 4 rows
  roundedButtons = Array(2).fill(null);
}
