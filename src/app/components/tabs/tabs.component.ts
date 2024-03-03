import { AfterViewInit, Component, Input, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HourlyComponent } from '../hourly/hourly.component';
import { DailyComponent } from '../daily/daily.component';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tabs',
  standalone: true,
  providers:[ WeatherService ],
  imports: [MatTabsModule, HourlyComponent, DailyComponent, HttpClientModule, NgIf, MatToolbarModule, DatePipe],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() eventEmitter: EventEmitter<string> = new EventEmitter();
  private subscription: Subscription = new Subscription();
  currentCity = 'RIO DE JANEIRO';
  cityData = [];
  dailyData = [];
  refreshTime = new Date();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = this.eventEmitter.subscribe( (data: string) => {
      this.getLocationData(this.currentCity);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.getLocationData('RIO DE JANEIRO');
  }

  tabChanged(event: any) {
    this.getLocationData(event.tab.textLabel);
  }

  getLocationData(city: string) {
    this.cityData = [];
    this.dailyData = [];
    this.currentCity = city;
    this.weatherService.getGeoLocation(city).subscribe( (data: any) => {
      
      if(!data.length) {
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;
      if( !lat || !lon) {
        return;
      }
      this.weatherService.getWeatherData(lat, lon).subscribe( (data:any) => {
        this.cityData = data;
        this.refreshTime = new Date();
      })
      this.weatherService.getDailyData(lat, lon).subscribe( (data:any) => {
        this.dailyData = data;
      })
    })
  }

}
