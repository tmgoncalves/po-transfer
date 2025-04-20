import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoMenuItem } from '@po-ui/ng-components';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;

  constructor(private http: HttpClient){}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => alert('Hello World!') }
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {property: 'sender', label: 'Remetente', placeholder: 'Remetente', required: true, gridColumns: 4},
    {property: 'recipient', label: 'Destinatário', placeholder: 'Destinatário', required: true, gridColumns: 4},
    {property: 'money', label: 'Valor', type: 'currency', placeholder: 'Valor', required: true, gridColumns: 4},
    {property: 'description', label: 'Descrição', required: true, gridColumns: 12, rows: 5, placeholder: 'Descrição'}
  ]

  save() {
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }
    this.http.post(this.API, this.raw).subscribe(() => {
      alert('Ok!');
    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }
}
