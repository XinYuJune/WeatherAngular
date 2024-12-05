import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private message:NzMessageService) { 
   
  }
  showLoading(message:string):void{
    this.message.loading(message,{ nzDuration: 2500 })
  }
  showSuccess(message:string):void{
    this.message.success(message)
  }
  showError(message:string):void{
    this.message.error(message)
  }
}
  

