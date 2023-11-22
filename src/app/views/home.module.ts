import { PlansComponent } from './home/plans/plans.component';
import { HoldersComponent } from './home/holders/holders.component';
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
import { CardComponent, NgxChartsModule } from '@swimlane/ngx-charts';
import { StartComponent } from './home/start/start.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MatSelectModule } from '@angular/material/select';
import { PhoneMaskDirective } from '../shared/phone-mask-directive/phone-mask-directive.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CardsComponent } from './home/cards/cards.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: StartComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'financial-analysis', component: FinancialAnalysisComponent },
      { path: 'account', component: AccountComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cards', component: CardComponent },
      { path: 'holders', component: HoldersComponent },
    ] 
  },
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
    MatSelectModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    AccountComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FinancialAnalysisComponent,
    AboutUsComponent,
    StartComponent,
    SidebarComponent,
    DashboardComponent,
    CardsComponent,
    CategoriesComponent,
    DashboardComponent,
    HoldersComponent,
    PlansComponent,
    StartComponent,
    PhoneMaskDirective,
  ],
})
export class HomeModule { }
