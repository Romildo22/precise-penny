import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.observableStatusLogin();
  }

  observableStatusLogin(){
    this.subscription = this.authService.isUserLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
