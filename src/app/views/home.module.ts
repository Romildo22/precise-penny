import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './home/login/login.component';
import { AccountComponent } from 'src/app/views/home/account/account.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/app/views/home/about-us/about-us.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './home/register/register.component';
import { FinancialAnalysisComponent } from './home/financial-analysis/financial-analysis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: AboutUsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'financial-analysis', component: FinancialAnalysisComponent },
      { path: 'account', component: AccountComponent },
      // { path: 'meus-produtos', component: MeusProdutosComponent },
    ] 
  },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    AccountComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FinancialAnalysisComponent,
    AboutUsComponent,
  ],
})
export class HomeModule { }
