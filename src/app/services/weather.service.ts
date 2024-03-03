import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(lat: number, lon: number): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=233bbfa214a5f78597a2a9b79d651604&units=metric&cnt=6`);
  }

  getDailyData(lat: number, lon: number): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=233bbfa214a5f78597a2a9b79d651604&units=metric&cnt=5`);
  }

  getGeoLocation(city: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=233bbfa214a5f78597a2a9b79d651604`);
  }
}
