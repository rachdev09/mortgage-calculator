import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MortgageService} from '@mortgage-calculator/mortgage.service';
import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';

@Component({
  selector: 'app-mortgage-calculator-page',
  templateUrl: './mortgage-calculator-page.component.html',
  styleUrls: ['./mortgage-calculator-page.component.scss']
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
      amortizationYears: [25],
      paymentFrequency: [12],
      term: [5],
      downpaymentPercentage: [0, [
        Validators.min(0)
      ]],
      downpaymentAmount: [0, [
        Validators.min(0),
        Validators.max(100000), // TODO: Update validator
        Validators.pattern(MortgageUtils.NumberPattern)
      ]]
    });
    this.paymentPlanForm.get('downpaymentAmount').valueChanges.subscribe(downpayment => {
      const mortgageAmount = this.paymentPlanForm.get('mortgageAmount').value;
      this.paymentPlanForm.get('downpaymentPercentage').setValue((downpayment / mortgageAmount) * 100);
    });
    this.mortgageService.calculateMortgage(this.paymentPlanForm.value);
  }

  calculate(): void {
    this.paymentPlanForm.markAllAsTouched();
    this.mortgageService.calculateMortgage(this.paymentPlanForm.value);
  }

}
