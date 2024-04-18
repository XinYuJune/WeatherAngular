  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { catchError, Observable, switchMap } from 'rxjs';

  interface GeocodingApiResponse{
    results:any[]
  }

  @Injectable({
    providedIn: 'root'
  })
  export class GeocodingService {

    constructor(private http: HttpClient) { }

    searchCity(cityName: string): Observable<any[]> {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      return this.http.get<GeocodingApiResponse>(geoUrl).pipe(
        switchMap((response: GeocodingApiResponse) => response.results),
        catchError(error => { throw error })
      )
    }

    getWeather(latitude:number,longtitude:number):Observable<any>{
      const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      return this.http.get(weatherUrl).pipe(
        catchError(error => { throw error; })
      );
    }
  }
