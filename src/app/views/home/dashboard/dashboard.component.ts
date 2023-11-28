import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ChartData } from 'src/app/shared/chart/chartData';
import { ChartsUtil } from 'src/app/shared/chart/charts-utils';
import { CompositeGraphicObject } from 'src/app/shared/chart/composite-graphic-object';
import { SimpleGraphicObject } from 'src/app/shared/chart/simple-graphic-object';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listCards: Array<any> = []
  listAssignment: Array<any> = []
  listCategory: Array<any> = []
  listDate: Array<any> = []
  initialListChartCategory: Array<any> = []
  loading$ = this.loadingService.loading$;
  currentUserID: string | undefined = ''

  chartData: SimpleGraphicObject[] = [];
  legendPos: any = 'below'
  colorScheme = {
    domain: ['#111B47'] // Define a cor para todas as séries
  };
  
  // colorScheme = [
  //   {name: 'Receita', value: '#5AA454'},
  //   {name: 'Despesas', value: '#E53935'},
  // ];

  constructor(  private service: DashboardService, 
                private router: Router, 
                public loadingService: LoadingService,
                private authService: AuthService, ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getUserId();
    }, 800);
  }

  getAllLists(){
    setTimeout(() => {
      this.getListCards();
      this.getListCategory();
      this.getListHolders();
      this.getListDates();
      this.formGroup.get('date')?.setValue(new Date);
    }, 400);
  }

  async getUserId(){
    try {
      this.currentUserID = await this.authService.getCurrentUserUID();
      this.getAllLists();
    } catch (error) {
      alert("Erro ao recuperar o usuário " + error);
    }
  }

  async onSubmit() {
    this.loadingService.show();
    try {
      const currentUserUID = this.currentUserID;
      const date = this.formGroup.get('date')?.value;
      const assignment = this.formGroup.get('assignment')?.value;
      const value = this.formGroup.get('value')?.value;
      const installment = this.formGroup.get('installment')?.value;
      const card = this.formGroup.get('card')?.value;
      const description = this.formGroup.get('description')?.value;
      const category = this.formGroup.get('category')?.value;
      const checkInputs = this.checkInformations(date, assignment, value, installment, card, description, category)

      if (checkInputs && currentUserUID) {
        await this.service.addValuesCard({
          date: date,
          assignment: assignment,
          value: value,
          installment: installment,
          card: card,
          description: description,
          category: category,
        }, currentUserUID);
        this.clearAllValues();
        this.getListDates();
      }
    } catch (error) {
      alert('Erro ao adicionar categoria: ' + error);
    } finally {
      setTimeout(() => {
        this.loadingService.hide();
      }, 500);
    }
  }

  checkInformations(date: String, assignment: String, value: String, installment: String,
                    card: String, description: String, category: String){
    if(!date)
    {
      alert("Por favor, insira uma data");
      return false;
    }
    else if(!assignment)
    {
      alert("Por favor, um titular");
      return false;
    }
    else if(!value)
    {
      alert("Por favor, insira o valor");
      return false;
    }
    else if(!installment)
    {
      alert("Por favor, insira a parcela");
      return false;
    }
    else if(!card)
    {
      alert("Por favor, selecione o cartão");
      return false;
    }
    else if(!description)
    {
      alert("Por favor, insira uma descrição");
      return false;
    }
    else if(!category)
    {
      alert("Por favor, selecione uma categoria");
      return false;
    }
    return true
  }

  clearAllValues(){
    this.formGroup.get('date')?.setValue('');
    this.formGroup.get('assignment')?.setValue('');
    this.formGroup.get('value')?.setValue('');
    this.formGroup.get('installment')?.setValue('');
    this.formGroup.get('card')?.setValue('');
    this.formGroup.get('description')?.setValue('');
    this.formGroup.get('category')?.setValue('');
  }

  async getListHolders(){
    try {
      const currentUserUID = this.currentUserID;
      if (currentUserUID) {
        this.listAssignment = await this.service.getListHolder(currentUserUID);
        this.listAssignment = this.listAssignment.filter(item => !Array.isArray(item.name)).sort((a, b) => a.name.localeCompare(b.name));
      }
    } catch (error) {
      console.error('Erro ao carregar os cartões:', error);
    }
  }

  async getListCards(){
    try {
      const currentUserUID = this.currentUserID;
      if (currentUserUID) {
        this.listCards = await this.service.getListCard(currentUserUID);
        this.listCards = this.listCards.filter(item => !Array.isArray(item.bank)).sort((a, b) => a.bank.localeCompare(b.bank));
      }
    } catch (error) {
      console.error('Erro ao carregar os cartões:', error);
    } 
  }

  async getListCategory(){
    try {
      const currentUserUID = this.currentUserID;
      if (currentUserUID) {
        this.listCategory = await this.service.getListCategories(currentUserUID);
        this.listCategory = this.listCategory.filter(item => !Array.isArray(item.category)).sort((a, b) => a.category.localeCompare(b.category));
      }
    } catch (error) {
      console.error('Erro ao carregar os cartões:', error);
    }
  }

  async getListDates(){
    this.loadingService.show();
    try
    {
      const currentUserUID = this.currentUserID;
      if(currentUserUID)
      {
        this.listDate = await this.service.getListDates(currentUserUID);
        this.setInitialListChartCategory(this.listDate)
        console.log(this.listDate);
      }
    } 
    catch(error)
    {

    } finally {
      setTimeout(() => {
        this.loadingService.hide();
      }, 500);
    }
  }

  setInitialListChartCategory(data: Array<any>) {
    // Primeiro, transforme os dados no formato de 'SimpleGraphicObject'
    const transformedData = ChartsUtil.getSimpleGraphicObject(data, 'category', 'value', 'description');

    // Agora, reestruture os dados para o formato que ngx-charts espera
    // this.chartData = this.restructureDataForChart(transformedData);
    this.chartData = transformedData;
    console.log("ChartData for ngx-charts: ", this.chartData);
  }
  
  redirectToCardPage() {
    this.router.navigate(['/cards']);
  }

  redirectToHolderPage() {
    this.router.navigate(['/holders']);
  }

  redirectToCategoryPage() {
    this.router.navigate(['/categories']);
  }

  public get formGroup(): FormGroup {
    return this.service.formGroup
  }

  restructureDataForChart(data: Array<SimpleGraphicObject>): CompositeGraphicObject[] {
    const chartData: CompositeGraphicObject[] = [];

    data.forEach(item => {
      // Encontre a série correspondente à categoria ou crie uma nova
      let seriesObject = chartData.find(series => series.name === item.name);
      if (!seriesObject) {
        seriesObject = { name: item.name, series: [] };
        chartData.push(seriesObject);
      }

      // Adicione o valor ao array de série
      seriesObject.series.push({ name: item.extra?.data || 'Total', value: item.value , extra: ''});
    });

    return chartData;
  }

}
