import { Component } from '@angular/core';

import { PoDynamicFormField, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

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
    alert('Ok');
  }
}
