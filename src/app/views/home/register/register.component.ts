import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: RegisterService, private loginService: LoginService) { }

  ngOnInit() {
  }

  async register(){
    try {
      const formValue = this.formGroup.value;
      const userData = {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        plan: formValue.plan 
      };

      await this.service.registerUser(formValue.email, formValue.password, userData);
      this.loginService.logout()
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error("Erro no registro:", error.message);
    }
  }

  public get formGroup(){
    return this.service.formGroup;
  }

}
