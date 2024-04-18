import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId?: number // 假设用户ID是一个数字
  errorMessage: string | null = null
  constructor(private router: Router, private userServices: UserService,private changeDetectorRef : ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      console.log(event);
    })
    
   }
  login() {
    if(this.userId==null||this.userId==undefined){
      this.errorMessage = 'User ID is required';
      return
    }
    this.userServices.checkUserIdExists(this.userId).subscribe({
      next: (res) => {
        this.router.navigate(['/city-search', this.userId]);
      },
      error: (err) => {
        console.error(err)
        console.log(err)
      }
    }

    )

  }
}
