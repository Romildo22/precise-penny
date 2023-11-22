import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
      this.formGroup = this.fb.group({
          category: [],
      })
  }

}
