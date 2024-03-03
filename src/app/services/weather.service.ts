import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '482944e26d320a80bd5e4f23b3de7d1f';
  constructor(private http: HttpClient) { }

  getWeatherData(lat: number, lon: number): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&cnt=6`);
  }

  getDailyData(lat: number, lon: number): Observable<any> {
    const preUrl = 'api.openweathermap.org/data/2.5/forecast/daily'; // not able to use this API with existing api key
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&cnt=5`);
  }

  getGeoLocation(city: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`);
  }
}
