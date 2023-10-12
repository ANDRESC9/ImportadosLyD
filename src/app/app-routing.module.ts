import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditsMenuComponent } from './credits/credits-menu/credits-menu.component';
import { CreditsTableComponent } from './credits/credits-table/credits-table.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import { NewDebtorComponent } from './credits/new-debtor/new-debtor.component';
import { CreditsPaidComponent } from './credits/credits-paid/credits-paid.component';

const routes: Routes = [
  {
    path: 'creditos',
    component: CreditsMenuComponent,
    children: [
      { path: 'tabla', component: CreditsTableComponent },
      { path: 'nuevo_credito', component: NewCreditComponent },
      { path: 'nuevo_deudor', component: NewDebtorComponent },
      { path: 'creditos_pagados', component: CreditsPaidComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
