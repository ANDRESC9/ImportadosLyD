import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditsMenuComponent } from './credits/credits-menu/credits-menu.component';
import { CreditsTableComponent } from './credits/credits-table/credits-table.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import { NewDebtorComponent } from './credits/new-debtor/new-debtor.component';
import { CreditsPaidComponent } from './credits/credits-paid/credits-paid.component';
import { CreditsHistoryComponent } from './credits/credits-history/credits-history.component';
import { ListDebtorsComponent } from './credits/list-debtors/list-debtors.component';
import { WelcomeScreenComponent } from './main/welcome-screen/welcome-screen.component';
import { CreditorsComponent } from './creditors/creditors.component';
import { CreditorsListComponent } from './creditors/creditors-list/creditors-list.component';

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  {
    path: 'creditos',
    component: CreditsMenuComponent,
    children: [
      { path: 'tabla', component: CreditsTableComponent },
      { path: 'nuevo_credito', component: NewCreditComponent },
      { path: 'nuevo_deudor', component: NewDebtorComponent },
      { path: 'lista_deudores', component: ListDebtorsComponent },
      { path: 'creditos_pagados', component: CreditsPaidComponent},
      { path: 'informacion_creditos', component: CreditsHistoryComponent}
    ]
  },
  {
    path: 'acreedores',
    component: CreditorsComponent,
    children: [
      { path: 'lista_adeudos', component: CreditorsListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
