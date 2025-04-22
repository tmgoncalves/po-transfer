import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoGaugeRanges, PoListViewAction, PoMenuItem, PoStepperComponent } from '@po-ui/ng-components';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  @ViewChild('stepper') stepper!: PoStepperComponent;
  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;
  transactionConfirm: any = [];

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  isHideLoading: boolean = true;

  poGaugeAll: number = 0;
  poGaugeDay:number = 0;

  constructor(private http: HttpClient){}

  turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Baixo', color: '#00b28e' },
    { from: 50, to: 75, label: 'Médio', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Alto', color: '#c64840' }
  ];

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', icon: 'an an-hand-peace', action: () => alert('Hello World!') }
  ];

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    },
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {property: 'sender', label: 'Remetente', placeholder: 'Remetente', required: true, gridColumns: 4},
    {property: 'recipient', label: 'Destinatário', placeholder: 'Destinatário', required: true, gridColumns: 4},
    {property: 'money', label: 'Valor', type: 'currency', placeholder: 'Valor', required: true, gridColumns: 4},
    {property: 'description', label: 'Descrição', required: true, gridColumns: 12, rows: 5, placeholder: 'Descrição'}
  ]

  save() {

    if(this.poGaugeDay >= 100) {
      alert('Limite diário atingido')
      return
    } else if (this.poGaugeAll >= 100) {
      alert('Limite total atingido')
      return
    }
    this.transactionConfirm = [];
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }

    this.isHideLoading = false;

    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true;
      this.transactionConfirm.push(response);
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
      this.isHideLoading = true;
    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  poData() {
    return this.propertyData;
  }

  poAccept() {
    return this.propertyAccept;
  }

  poConcluded() {
    return this.propertyConcluded;
  }

  confirm() {
    this.isHideLoading = false;
    this.updatePoGauge();

    setTimeout(() => {
      this.propertyAccept = true;
      this.stepper.next();
      this.propertyAccept = false;
      this.dynamicForm.reset();
      this.isHideLoading = true;
    }, 2000);

    setTimeout(() => {
      this.stepper.first();
    }, 4000)
  }

  cancel() {
    this.stepper.first();
  }

  updatePoGauge() {
    this.http.get(this.API).subscribe((items: any) => {
      this.poGaugeAll = 10 * items.length;

      const today = new Date().toLocaleDateString();
      let count = 0;

      items.map((response: any) => {
        const dateToCompare = new Date(response.date).toLocaleDateString();

        if (today === dateToCompare) {
          count++;
        }
      })
      this.poGaugeDay = count;
    })
  }
}
