import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule, MatGridListModule, DatePipe, DecimalPipe ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css'
})
export class DailyComponent {
  color = 'lightblue';
  listData: any = [];

  private _dailyData: any;
    
  @Input() set dailyData(value: any) {
    this._dailyData = value;
    this.listData = value?.list?.length? value.list.slice(0, 5) : [];
    this.doSomething(this._dailyData);
  }
  
  get dailyData(): any {  
    return this._dailyData; 
  }

  doSomething( data: any) {
    console.log(data);
  }

  getIconImage(icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }
}
