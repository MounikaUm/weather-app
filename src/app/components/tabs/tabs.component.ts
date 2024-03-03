import { AfterViewInit, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { HourlyComponent } from '../hourly/hourly.component';
import { DailyComponent } from '../daily/daily.component';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-tabs',
  standalone: true,
  providers:[ WeatherService ],
  imports: [MatTabsModule, HourlyComponent, DailyComponent, HttpClientModule, NgIf],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterViewInit {

  currentCity = 'RIO DE JANEIRO';
  cityData = [];
  dailyData = [];

  constructor(private weatherService: WeatherService) { }

  ngAfterViewInit(): void {
    this.getLocationData('RIO DE JANEIRO');
  }

  tabChanged(event: any) {
    console.log(event.tab.textLabel);
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
      })
      this.weatherService.getDailyData(lat, lon).subscribe( (data:any) => {
        this.dailyData = data;
      })
    })
  }

}
