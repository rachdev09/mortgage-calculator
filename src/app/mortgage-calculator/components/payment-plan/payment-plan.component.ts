import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {isEmpty} from 'lodash';
import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss']
})
export class PaymentPlanComponent {

  @Input() paymentPlanForm: FormGroup;
  @Output() calculate: EventEmitter<void> = new EventEmitter();

  get amortizationYears(): {label: string, value: number}[] {
    return MortgageUtils.getAmortizationYears();
  }

  get paymentFrequency(): {label: string, value: number}[] {
    return MortgageUtils.getPaymentFrequencies();
  }

  get terms(): {label: string, value: number}[] {
    return MortgageUtils.getTerms();
  }

  hasError(formControlName: string): boolean {
    return this.paymentPlanForm.get(formControlName).invalid
      && (this.paymentPlanForm.get(formControlName).touched
      || this.paymentPlanForm.get(formControlName).dirty);
  }

  getError(formControlName: string): string {
    switch (true) {
      case this.paymentPlanForm.get(formControlName).errors.required:
        return 'Please enter a value';
      case !isEmpty(this.paymentPlanForm.get(formControlName).errors.pattern):
        return 'Please enter a number';
      case !isEmpty(this.paymentPlanForm.get(formControlName).errors.min):
        return `Please enter a value above ${this.paymentPlanForm.get(formControlName).errors?.min?.min}`;
      case !isEmpty(this.paymentPlanForm.get(formControlName).errors.max):
        return `Please enter a value below ${this.paymentPlanForm.get(formControlName).errors?.max?.max}`;
      default:
        return 'Invalid Value';
    }
  }

}
