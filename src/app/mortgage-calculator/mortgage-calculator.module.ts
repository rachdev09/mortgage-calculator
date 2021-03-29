import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MortgageCalculatorPageComponent} from '@mortgage-calculator/mortgage-calculator-page/mortgage-calculator-page.component';
import {PaymentPlanComponent} from '@mortgage-calculator/components/payment-plan/payment-plan.component';
import {CalculationSummaryComponent} from '@mortgage-calculator/components/calculation-summary/calculation-summary.component';
import {MortgageSummaryComponent} from '@mortgage-calculator/components/mortgage-summary/mortgage-summary.component';
import {PaymentDiagramComponent} from '@mortgage-calculator/components/payment-diagram/payment-diagram.component';
import {MortgageCalculatorRoutingModule} from '@mortgage-calculator/mortgage-calculator-routing.module';
import {PaymentScheduleComponent} from '@mortgage-calculator/components/payment-schedule/payment-schedule.component';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    MortgageCalculatorPageComponent,
    PaymentPlanComponent,
    CalculationSummaryComponent,
    MortgageSummaryComponent,
    PaymentDiagramComponent,
    PaymentScheduleComponent
  ],
  imports: [
    ReactiveFormsModule,
    MortgageCalculatorRoutingModule,
    CommonModule
  ],
  providers: [MortgageService]
})
export class MortgageCalculatorModule { }
