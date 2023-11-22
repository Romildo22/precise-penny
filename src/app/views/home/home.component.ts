import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.observableStatusLogin();
  }

  observableStatusLogin(){
    this.authService.formGroup.get('isLoggedIn')?.valueChanges.subscribe( value => {
      this.isLoggedIn = value
    })
  }

}
