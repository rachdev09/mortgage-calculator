import {Injectable} from '@angular/core';
import {times, sum} from 'lodash';
import {PaymentPlan, PaymentSchedule, PaymentTotals} from '@mortgage-calculator/mortgage';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  paymentPlan: PaymentPlan;
  paymentSchedule: PaymentSchedule[];
  paymentTotals: PaymentTotals;

  get numOfTermPayments(): number {
    const term = this.paymentPlan.term;
    const frequency = this.paymentPlan.paymentFrequency;
    return term * frequency;
  }

  get numOfPayments(): number {
    const years = this.paymentPlan.amortizationYears;
    const frequency = this.paymentPlan.paymentFrequency;
    return years * frequency;
  }

  get mortgagePayment(): number {
    return this.paymentSchedule[0].totalPayment;
  }

  get principalTermPayment(): number {
    return this.paymentTotals.termTotals.principalPayment;
  }

  get principalPayment(): number {
    return this.paymentTotals.mortgageTotals.principalPayment;
  }

  get interestTermPayment(): number {
    return this.paymentTotals.termTotals.interestPayment;
  }

  get interestPayment(): number {
    return this.paymentTotals.mortgageTotals.interestPayment;
  }

  get totalTermPayment(): number {
    return this.paymentTotals.termTotals.totalPayment;
  }

  get totalPayment(): number {
    return this.paymentTotals.mortgageTotals.totalPayment;
  }

  get afterTermBalance(): number {
    return this.paymentTotals.afterTermTotals.principalPayment;
  }

  calculateMortgage(paymentPlan: PaymentPlan): void {
    this.paymentPlan = {...paymentPlan};
    this.paymentPlan.principal = this.paymentPlan.mortgageAmount - this.paymentPlan.downpaymentAmount;
    this.paymentPlan.interestRate = paymentPlan.interestRate / 100;
    this.paymentSchedule = [];
    this.paymentTotals = null;
    this.calculatePaymentSchedule(this.paymentPlan);
    this.calculatePaymentTotals(this.paymentPlan, this.paymentSchedule);
  }

  calculatePaymentSchedule(paymentPlan: PaymentPlan): void {
    const paymentSchedule: PaymentSchedule[] = [];
    let index = 1;
    const numberOfPayments = paymentPlan.paymentFrequency * paymentPlan.amortizationYears;
    let totalPayment = this.getTotalPayment(paymentPlan);

    paymentSchedule[0] = {} as PaymentSchedule;
    paymentSchedule[0].interestPayment = this.getInterestPayment(paymentPlan);
    paymentSchedule[0].principalPayment = this.getPrincipalPayment(totalPayment, paymentSchedule[0].interestPayment);
    paymentSchedule[0].totalPayment = totalPayment;
    paymentSchedule[0].endingBalance = this.getEndingBalance(paymentPlan.principal, paymentSchedule[0].principalPayment);
    while (index < numberOfPayments) {
      paymentSchedule[index] = {} as PaymentSchedule;
      paymentSchedule[index].interestPayment = this.getInterestPayment(paymentPlan, paymentSchedule[index - 1].endingBalance);
      if (paymentSchedule[index - 1].endingBalance < totalPayment) {
        totalPayment = paymentSchedule[index - 1].endingBalance + paymentSchedule[index].interestPayment;
      }
      paymentSchedule[index].totalPayment = totalPayment;
      paymentSchedule[index].principalPayment = this.getPrincipalPayment(totalPayment, paymentSchedule[index].interestPayment);
      paymentSchedule[index].endingBalance = this.getEndingBalance(paymentSchedule[index - 1].endingBalance,
        paymentSchedule[index].principalPayment);
      index++;
    }
    this.paymentSchedule = paymentSchedule;
  }

  getTotalPayment(paymentPlan: PaymentPlan): number {
    const interestByFrequency = paymentPlan.interestRate / paymentPlan.paymentFrequency;
    return ((paymentPlan.principal * interestByFrequency)
      * Math.pow(1 + interestByFrequency, paymentPlan.amortizationYears * paymentPlan.paymentFrequency))
      / (Math.pow(1 + interestByFrequency, paymentPlan.amortizationYears * paymentPlan.paymentFrequency) - 1);
  }

  getInterestPayment(paymentPlan: PaymentPlan, balance?: number): number {
    const interestByFrequency = paymentPlan.interestRate / paymentPlan.paymentFrequency;
    return balance ? balance * interestByFrequency : paymentPlan.principal * interestByFrequency;
  }

  getPrincipalPayment(totalPayment: number, interestPayment: number): number {
    return totalPayment - interestPayment;
  }

  getEndingBalance(endingBalance: number, principalPayment: number): number {
    return endingBalance - principalPayment;
  }

  calculatePaymentTotals(paymentPlan: PaymentPlan, paymentSchedule: PaymentSchedule[]): void {
    const years = paymentPlan.amortizationYears;
    this.paymentTotals = {} as PaymentTotals;
    this.paymentTotals.yearTotals = [];
    times(years, (index) => {
      this.paymentTotals.yearTotals[index] = this.getYearTotals(index + 1, paymentPlan, paymentSchedule);
    });
    this.paymentTotals.termTotals = this.getTermTotals(paymentPlan, paymentSchedule);
    this.paymentTotals.afterTermTotals = this.getAfterTermTotals(paymentPlan, paymentSchedule);
    this.paymentTotals.mortgageTotals = this.getMortgageTotals(paymentPlan, paymentSchedule);
  }

  getYearTotals(year: number, paymentPlan: PaymentPlan, paymentSchedule: PaymentSchedule[]): PaymentSchedule {
    const yearTotals = {} as PaymentSchedule;
    const frequency = paymentPlan.paymentFrequency;
    const startIndex = year === 1 ? 0 : (year - 1) * frequency;
    const endIndex = year * frequency;

    yearTotals.principalPayment = sum(paymentSchedule.map(payment => payment.principalPayment).slice(startIndex, endIndex));
    yearTotals.interestPayment = sum(paymentSchedule.map(payment => payment.interestPayment).slice(startIndex, endIndex));
    yearTotals.totalPayment = sum(paymentSchedule.map(payment => payment.totalPayment).slice(startIndex, endIndex));
    yearTotals.endingBalance = paymentSchedule[endIndex - 1].endingBalance;
    return yearTotals;
  }

  getTermTotals(paymentPlan: PaymentPlan, paymentSchedule: PaymentSchedule[]): PaymentSchedule {
    const termTotals = {} as PaymentSchedule;
    const term = paymentPlan.term;
    const frequency = paymentPlan.paymentFrequency;
    const startIndex = 0;
    const endIndex = term * frequency;
    termTotals.principalPayment = sum(paymentSchedule.map(payment => payment.principalPayment).slice(startIndex, endIndex + 1));
    termTotals.interestPayment = sum(paymentSchedule.map(payment => payment.interestPayment).slice(startIndex, endIndex + 1));
    termTotals.totalPayment = sum(paymentSchedule.map(payment => payment.totalPayment).slice(startIndex, endIndex + 1));
    termTotals.endingBalance = paymentSchedule[endIndex - 1].endingBalance;
    return termTotals;
  }

  getAfterTermTotals(paymentPlan: PaymentPlan, paymentSchedule: PaymentSchedule[]): PaymentSchedule {
    const afterTermTotals = {} as PaymentSchedule;
    const term = paymentPlan.term;
    const frequency = paymentPlan.paymentFrequency;
    const years = paymentPlan.amortizationYears;
    const startIndex = term * frequency + 1;
    const endIndex = years * frequency;
    afterTermTotals.principalPayment = sum(paymentSchedule.map(payment => payment.principalPayment).slice(startIndex, endIndex + 1));
    afterTermTotals.interestPayment = sum(paymentSchedule.map(payment => payment.interestPayment).slice(startIndex, endIndex + 1));
    afterTermTotals.totalPayment = sum(paymentSchedule.map(payment => payment.totalPayment).slice(startIndex, endIndex + 1));
    afterTermTotals.endingBalance = paymentSchedule[endIndex - 1].endingBalance;
    return afterTermTotals;
  }

  getMortgageTotals(paymentPlan: PaymentPlan, paymentSchedule: PaymentSchedule[]): PaymentSchedule {
    const termTotals = {} as PaymentSchedule;
    const years = paymentPlan.amortizationYears;
    const frequency = paymentPlan.paymentFrequency;
    const startIndex = 0;
    const endIndex = years * frequency;
    termTotals.principalPayment = sum(paymentSchedule.map(payment => payment.principalPayment).slice(startIndex, endIndex + 1));
    termTotals.interestPayment = sum(paymentSchedule.map(payment => payment.interestPayment).slice(startIndex, endIndex + 1));
    termTotals.totalPayment = sum(paymentSchedule.map(payment => payment.totalPayment).slice(startIndex, endIndex + 1));
    termTotals.endingBalance = paymentSchedule[endIndex - 1].endingBalance;
    return termTotals;
  }

}
