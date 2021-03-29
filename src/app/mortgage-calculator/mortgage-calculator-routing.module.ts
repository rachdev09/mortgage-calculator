import {NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MortgageCalculatorPageComponent} from '@mortgage-calculator/mortgage-calculator-page/mortgage-calculator-page.component';
import {PaymentScheduleComponent} from '@mortgage-calculator/components/payment-schedule/payment-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: MortgageCalculatorPageComponent
  },
  {
    path: 'payment-schedule',
    component: PaymentScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MortgageCalculatorRoutingModule { }
