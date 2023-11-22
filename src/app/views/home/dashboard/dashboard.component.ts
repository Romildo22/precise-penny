import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listMonth = [
    { mes: 'Janeiro' },
    { mes: 'Fevereiro' },
    { mes: 'Março' },
    { mes: 'Abril' },
    { mes: 'Maio' },
    { mes: 'Junho' },
    { mes: 'Julho' },
    { mes: 'Agosto' },
    { mes: 'Setembro' },
    { mes: 'Outubro' },
    { mes: 'Novembro' },
    { mes: 'Dezembro' }
  ];

  listCard: Array<String> = []
  listAssignment: Array<String> = []
  listCategory: Array<String> = []

  constructor(private service: DashboardService, private router: Router) { }

  ngOnInit() {
  }
  
  redirectToCategoryPage() {
    this.router.navigate(['/categories']);
  }

  public get formGroup(): FormGroup {
    return this.service.formGroup
  }

}
