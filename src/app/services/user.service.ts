import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl="http://127.0.0.1:5145/api"

  //获取用户收藏的城市
  getUserFavoriteCities(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Cities/User/${userId}/Favorites`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(()=>error.error.message || '获取收藏城市时发生错误。'
      )})
    )
  }

   // 用户添加收藏城市
   addToUserFavorites(userId: number, cityId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Cities/User/${userId}/Favorites`, { cityId });
  }

  // 用户移除收藏城市
  removeFromUserFavorites(userId: number, cityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Cities/User/${userId}/Favorites/${cityId}`);
  }

  //检查用户是否存在
  checkUserIdExists(userId:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/User/check-id/${userId}`)
    .pipe(
      catchError((error)=>{
        return throwError(()=>error)
      })
    )
  }

  //查找用户名
  getUserName(userId:Number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/User/getUserName/${userId}`)
    .pipe(
      catchError(
        (error)=>{
          return throwError(
            ()=>error
          )
        }
      )
    )
  }
  constructor(private http:HttpClient) { }
}
