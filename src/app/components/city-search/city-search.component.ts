import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  cityName: string='长春'
  weather: any
  userId?: number | null
  userName:string='默认用户名'
  favoriteCities?: any[]
  errorMessage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private geocodingService: GeocodingService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramsUserId = params.get('userId')
      if (paramsUserId) {
        console.log
        this.userId = +paramsUserId
        this.getUserFavoriteCities(this.userId)
        this.getUserName(this.userId)
        
      }
      else {
        console.error('No UserId Provided.')
      }
    })
  }

 getUserFavoriteCities(userId: number){
    this.userService.getUserFavoriteCities(userId).subscribe({
      next: (cities) => {
        this.favoriteCities=cities
        this.userName=this.userName
        this.errorMessage = null; // 成功获取数据后重置错误消息
      },
      error: (error) => {
        console.error("无法找到该用户喜欢的城市:", error);
        
        // 根据后端返回的HTTP状态码或错误信息提供明确的提示
        if(error.status === 404) {
          this.errorMessage = "用户ID不存在或暂无收藏城市。";
        } else {
          this.errorMessage = "获取用户喜欢的城市时发生错误，请稍后重试。"; // 通用错误信息
        }
      }
    })
  }

getWeatherForCity(cityName: string): void {
  this.geocodingService.searchCity(cityName).subscribe(
    geoCodeInfo => {
      this.cityName = cityName
      const latitude = geoCodeInfo[0].latitude
      const longtitude = geoCodeInfo[0].longtitude
      this.geocodingService.getWeather(latitude, longtitude).subscribe(
        weather => {
          this.weather = weather
        }
      )
    }
  )
}

//获取用户名
getUserName(userId:number):void{
  
  this.userService.getUserName(userId).subscribe(
    userName=>{
      this.userName=userName.userName
    }
  )
}
}
