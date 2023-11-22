import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();
  userName: string = '';
  userPlan: string = '';
  userData: any;

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router,) { }

  ngOnInit() {
    setTimeout(() => {
      this.observableStatusLogin();
    }, 300);
  }

  observableStatusLogin(){
    this.subscription = this.authService.isUserLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.authService.formGroup.get('isLoggedIn')?.patchValue(isLoggedIn)
      isLoggedIn ? this.fetchUserLoggedIn() : ''
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async fetchUserLoggedIn(){
    this.userData = await this.authService.getUserLoggedIn();
    if(this.userData)
    {
      this.userName = this.userData?.name;
      this.userPlan = this.userData?.plan
    }
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

}
