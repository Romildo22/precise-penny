import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  email: string = ''
  password: string = ''
  category: string = ''

  constructor(private service: CategoriesService) { }

  ngOnInit() {
    this.observableEmail();
    this.observablePassword();
  }

  observableEmail(){
    this.formGroup.get('email')?.valueChanges.subscribe(email => {
      if (this.validateEmail(email)) {
        this.email = email;
      }
    });
  }

  observablePassword(){
    this.formGroup.get('password')?.valueChanges.subscribe(password => {
      if (password && password.length >= 6) {
        this.password = password;
      }
    });
  }

  validateEmail(email: string): boolean {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(String(email).toLowerCase());
  }

  login() {
    if(this.email && this.password) {

    } else {
      alert("preencher campos");
    }
  }

  public get formGroup(){
    return this.service.formGroup;
  }

}