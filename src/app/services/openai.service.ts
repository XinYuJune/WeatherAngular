import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http:HttpClient) { }

  private openAIUrl='http://localhost:5145/api'

  askGPT3(prompt:string):Observable<any>{
    return this.http.post(`${this.openAIUrl}/openAI/askGPT`,prompt)
  }
}
