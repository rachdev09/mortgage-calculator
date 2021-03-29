import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const crossFieldValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const mortgageAmount = control.get('mortgageAmount').value;
  const downpaymentAmount = control.get('downpaymentAmount').value;
  const amortizationYears = control.get('amortizationYears').value;
  const term = control.get('term').value;
  return mortgageAmount < downpaymentAmount ? { crossFieldAmountError: true } : amortizationYears < term ? { crossFieldPeriodError: true } : null;
};
