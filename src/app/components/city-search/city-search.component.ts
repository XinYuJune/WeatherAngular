import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { id_ID } from 'ng-zorro-antd/i18n';
import { City } from 'src/app/models/city.model';
import { MessageService } from 'src/app/services/message.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { UserService } from 'src/app/services/user.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  isLoading: boolean = true // 设置默认为Loading
  cityName: string = 'ChangChun'
  weather: any
  userId?: number | null
  cityId?: number | null
  userName: string = '未登录'
  favoriteCities?: any[]
  gptAnswer:string = ''
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private weatherService: WeatherService,
    private message: MessageService,
    private openai : OpenaiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramsUserId = params.get('userId')
      if (paramsUserId) {
        this.userId = +paramsUserId
        this.getUserFavoriteCities(this.userId)
        this.getUserName(this.userId)
      }
      else {
        this.message.showError("未提供用户ID")
        console.error('No UserId Provided.')
      }
    })
  }
  //获取用户收藏的城市
  getUserFavoriteCities(userId: number) {
    this.userService.getUserFavoriteCities(userId).subscribe({
      next: (cities) => {
        this.favoriteCities = cities
        this.userName = this.userName
      },
      error: (error) => {
        this.message.showError(`您的收藏城市加载失败了呜呜呜~~~`)
        console.error("无法找到该用户喜欢的城市:", error);
        // 根据后端返回的HTTP状态码或错误信息提供明确的提示
        if (error.status === 404) {
          this.message.showError(`您似乎没有收藏城市捏~~~`)
        } else {
          this.message.showError(`发生错误，请稍后重试捏~~~`)
        }
      }
    })
  }

  //获取城市天气
  getWeatherForCity(cityName: string): void {
    this.isLoading = true
    this.message.showLoading(`${cityName}的天气正在查询中捏~~~`)
    this.weatherService.getWeather(cityName).subscribe({
      next: cityData => {

        this.weather = cityData
        this.cityName = cityData.cityInfo.name
        this.cityId = cityData.cityInfo.id
        this.isLoading = false
        console.log(cityData.cityInfo); // 城市信息
        console.log(cityData.weatherInfo); // 天气信息
        if (this.cityId) {
          this.addCity(cityData.cityInfo) //城市入库
        }
        this.message.showSuccess(`${cityName}的天气查询好了捏~~~`)

      },
      error: error => {
        this.message.showError(`${cityName}的天气找不到了呜呜呜~~~`)
        console.log(error)
        this.isLoading = false
      }
    }
    )

  }

  //城市ID入库
  addCity(city: City) {
    if (city) {
      //注入服务：用返回的weather对象转换为city对象的方法
      this.userService.addCity(city).subscribe({
        next: () => {
          console.log(`${this.cityName}的查询结果已被添加入库`)
        },
        error: (error) => {
          console.error(`${this.cityName}入库失败！`, error)
          // console.log("入库信息：");
          // console.log(city)
        }
      })
    }
    else {
      console.error(`城市的ID传入为空！`)
    }
  }
  //GPT查询天气
  askGPT3(cityName:string){
    if(cityName==null){
      this.message.showError("输入的城市名为空!")
      return
    }
    const promptInfo=this.cityName+"的今日天气如何?"
    this.openai.askGPT3(promptInfo).subscribe({
      next:gptResult=>{
        console.log(gptResult)
        this.gptAnswer=gptResult.choices.message.content
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  //添加用户收藏的城市
  addToUserFavorites(userId: number, cityId: number): void {
    this.message.showLoading(`正在标记喜欢的城市捏.......`)
    if (userId == null) {
      this.message.showError(`不许你不登录！`)
      console.error(`用户ID不能为空！`)
    }
    else {
      this.userService.addToUserFavorites(userId, cityId).subscribe({
        next: () => {
          this.message.showSuccess(`好耶！${this.cityName}收藏成功！`)
          console.log(`收藏${this.cityName}成功！`)
          this.getUserFavoriteCities(userId)
        },
        error: (error) => {
          this.message.showError(`呜呜呜，${this.cityName}收藏失败了`)
          console.error(`收藏${this.cityName}失败！`, error)
          this.getUserFavoriteCities(userId) // 重新获取收藏的城市
        }
      })
    }
  }

  //删除用户收藏的城市
  removeFromUserFavorites(userId: number, cityId: number): void {
    this.message.showLoading(`正在删除：${this.cityName}`)
    this.userService.removeFromUserFavorites(userId, cityId).subscribe({
      next: () => {
        this.message.showSuccess(`${this.cityName}，我会永远记住你的，再见！`)
        console.log(`城市"${cityId}"删除成功`)
        this.getUserFavoriteCities(userId) // 更新用户收藏城市操作
      },
      error: (error) => {
        this.message.showError(`${this.cityName}：我还不想被删除，呜呜呜！`)
        console.error("删除收藏城市遇到错误！", error)
      }
    })

  }

  //获取用户名
  getUserName(userId: number): void {

    this.userService.getUserName(userId).subscribe(
      userName => {
        this.userName = userName.userName
        this.message.showSuccess(`${this.userName}，欢迎使用本系统！`)
      }
    )
  }
}
