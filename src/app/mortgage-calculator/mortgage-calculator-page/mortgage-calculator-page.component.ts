import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALIDATORS, Validators} from '@angular/forms';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';
import {crossFieldValidator} from '@mortgage-calculator/cross-field.validator';

@Component({
  selector: 'app-mortgage-calculator-page',
  templateUrl: './mortgage-calculator-page.component.html',
  styleUrls: ['./mortgage-calculator-page.component.scss'],
  providers: [{ provide: NG_VALIDATORS, useExisting: crossFieldValidator, multi: true }]
})
export class MortgageCalculatorPageComponent implements OnInit {

  paymentPlanForm: FormGroup;

  constructor(private fb: FormBuilder, public mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.paymentPlanForm = this.fb.group({
      mortgageAmount: [100000, [
        Validators.required,
        Validators.min(1),
        Validators.pattern(MortgageUtils.NumberPattern)
      ]],
      interestRate: [5.00, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(MortgageUtils.NumberPattern)
      ]],
      amortizationYears: [25, [
        Validators.required
      ]],
      paymentFrequency: [12, [
        Validators.required
      ]],
      term: [5, [
        Validators.required
      ]],
      downpaymentPercentage: [0, [
        Validators.min(0)
      ]],
      downpaymentAmount: [0, [
        Validators.min(0),
        Validators.pattern(MortgageUtils.NumberPattern)
      ]]
    }, {validator: crossFieldValidator});
    this.paymentPlanForm.get('downpaymentAmount').valueChanges.subscribe(downpayment => {
      const mortgageAmount = this.paymentPlanForm.get('mortgageAmount').value;
      this.paymentPlanForm.get('downpaymentPercentage').setValue((downpayment / mortgageAmount) * 100);
    });
    this.mortgageService.calculateMortgage(this.paymentPlanForm.value);
  }

  calculate(): void {
    this.paymentPlanForm.markAllAsTouched();
    if (this.paymentPlanForm.valid) {
      this.mortgageService.calculateMortgage(this.paymentPlanForm.value);
    }
  }

}
