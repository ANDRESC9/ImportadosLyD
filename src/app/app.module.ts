import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './main/header/header.component';
import { CreditsMenuComponent } from './credits/credits-menu/credits-menu.component';
import { CreditsTableComponent } from './credits/credits-table/credits-table.component';
import { NewCreditComponent } from './credits/new-credit/new-credit.component';
import { NewDebtorComponent } from './credits/new-debtor/new-debtor.component';
import { PayPartComponent } from './credits/pay-part/pay-part.component';
import { CreditsFilterComponent } from './credits/credits-filter/credits-filter.component';
import { CreditsPaidComponent } from './credits/credits-paid/credits-paid.component';
import { CreditsHistoryComponent } from './credits/credits-history/credits-history.component';
import { ListDebtorsComponent } from './credits/list-debtors/list-debtors.component';
import { EditDebtorComponent } from './credits/edit-debtor/edit-debtor.component';
import { NgxPaginationModule } from 'ngx-pagination';
<<<<<<< HEAD
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersTableComponent } from './suppliers/suppliers-table/suppliers-table.component';
import { WelcomeScreenComponent } from './main/welcome-screen/welcome-screen.component';
=======
import { HistoryFilterComponent } from './credits/history-filter/history-filter.component';
>>>>>>> camilo



@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    HeaderComponent,
    CreditsMenuComponent,
    CreditsTableComponent,
    NewCreditComponent,
    NewDebtorComponent,
    PayPartComponent,
    CreditsFilterComponent,
    CreditsPaidComponent,
    CreditsHistoryComponent,
    ListDebtorsComponent,
    EditDebtorComponent,
<<<<<<< HEAD
    SuppliersComponent,
    SuppliersTableComponent,
    WelcomeScreenComponent,
=======
    HistoryFilterComponent,
    
>>>>>>> camilo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
