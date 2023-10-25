import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/home/login/login.component';
import { RegisterComponent } from './views/home/register/register.component';

const routes:  Routes = [
  { path: '', loadChildren: () => import('./views/home.module').then(m => m.HomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
