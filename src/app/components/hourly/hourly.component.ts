import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule, MatGridListModule, DatePipe, DecimalPipe ],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css'
})
export class HourlyComponent {
  color = 'lightblue';
  listData: any = [];

  private _cityData: any;
    
  @Input() set cityData(value: any) {
    this._cityData = value;
    this.listData = value?.list?.length? value.list : [];
    this.doSomething(this._cityData);
  }
  
  get cityData(): any {  
    return this._cityData; 
  }

  doSomething( data: any) {
    console.log(data);
  }

  getIconImage(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }
}
