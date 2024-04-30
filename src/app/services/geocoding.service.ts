  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { of,catchError, Observable, switchMap } from 'rxjs';

  interface GeocodingApiResponse{
    results:any[]
  }

  @Injectable({
    providedIn: 'root'
  })
  export class GeocodingService {

    constructor(private http: HttpClient) { }

    //搜寻城市，仅显示第一个
    searchCity(cityName: string): Observable<any[]> {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      return this.http.get<GeocodingApiResponse>(geoUrl).pipe(
        switchMap((response: GeocodingApiResponse) => {
          return of(response.results || [])
        }
        ),
        catchError(error => { throw error })
      )
    }
    //实现获取天气的服务 传入经纬度
    getWeather(latitude:number,longitude:number):Observable<any>{
      const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      return this.http.get(weatherUrl).pipe(
        catchError(error => { throw error; })
      );
    }
  }
