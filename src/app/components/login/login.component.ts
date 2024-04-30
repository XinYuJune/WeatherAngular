import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router'
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId?: number // ID是一个数字
  constructor(private router: Router,
    private userServices: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private message: MessageService
  ) {
    this.router.events.subscribe(event => {
      console.log(event);
    })

  }
  login() {
    this.message.showLoading("正在登录......")
    if (this.userId == null || this.userId == undefined) {
      
      this.message.showError("没有输入ID！休想！")
      return
    }
    this.userServices.checkUserIdExists(this.userId).subscribe({
      next: (res) => {
        this.router.navigate(['/city-search', this.userId]);
        this.message.showSuccess("登录成功......")
      },
      error: (err) => {
        this.message.showError("您并没有在用户名单上www....")
        console.error(err)
        console.log(err)
      }
    }
    )
  }
}
