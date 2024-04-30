import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { GeocodingService } from './geocoding.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //降低解耦度，单独设置服务处理查询天气
  constructor(private geoCoingService:GeocodingService) { 
  }

  getWeather(cityName:string):Observable<any>{
    return this.geoCoingService.searchCity(cityName).pipe(
      switchMap( geoCodeInfoArray =>{
        if(geoCodeInfoArray.length>0){
          const city=geoCodeInfoArray[0]
          const cityInfo={
            id:city.id,
            name:city.name,
            latitude:city.latitude,
            longitude:city.longitude,
            countryCode:city.country_code
          }
          return this.geoCoingService.getWeather(city.latitude,city.longitude).pipe(
            map(weatherInfo =>({
              weatherInfo,
              cityInfo
            }))
          )
      }
        else{
          return  throwError(()=>{new Error(`找不到${cityName}的天气数据`)})
        }
      }),
      catchError(
        error=> throwError(
          ()=> error
        )
      )
    )
  }
}
