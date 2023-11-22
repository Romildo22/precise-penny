import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DashboardService {

    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            date: [],
            assignment: [],
            valeu: [],
            installment: [],
            card: [],
            description: [],
            category: [],
        })
    }

}
