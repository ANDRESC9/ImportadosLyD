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
import { WelcomeScreenComponent } from './main/welcome-screen/welcome-screen.component';
import { LoginComponent } from './login/login.component';
import { HistoryFilterComponent } from './credits/history-filter/history-filter.component';
import { CreditsPaidFilterComponent } from './credits/credits-paid-filter/credits-paid-filter.component';
import { DebtorsFilterComponent } from './credits/debtors-filter/debtors-filter.component';
import { CreditorsComponent } from './creditors/creditors.component';
import { CreditorsListComponent } from './creditors/creditors-list/creditors-list.component';
import { NotificationsComponent } from './main/notifications/notifications.component';



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
    WelcomeScreenComponent,
    LoginComponent,
    HistoryFilterComponent,
    CreditsPaidFilterComponent,
    DebtorsFilterComponent,
    CreditorsComponent,
    CreditorsListComponent,
    NotificationsComponent,
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
