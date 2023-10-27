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
import { CreditorsMenuComponent } from './creditors/creditors-menu.component';
import { SuppliersComponent } from './creditors/modules/suppliers/suppliers.component';
import { SuppliersDebtsComponent } from './creditors/modules/suppliers-debts/suppliers-debts/suppliers-debts.component';


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
    path: 'deudas',
    component: CreditorsMenuComponent,
    children: [
      {path: 'lista_deudas', component: SuppliersDebtsComponent},
      {path: 'provedores', component: SuppliersComponent}
    ]
    
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
