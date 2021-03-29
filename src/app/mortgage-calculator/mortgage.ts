export interface PaymentPlan {
  mortgageAmount: number;
  principal: number;
  interestRate: number;
  amortizationYears: number;
  paymentFrequency: number;
  term: number;
  downpaymentPercentage: number;
  downpaymentAmount: number;
}

export interface PaymentSchedule {
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  endingBalance: number;
}

export interface PaymentTotals {
  yearTotals: PaymentSchedule[];
  termTotals: PaymentSchedule;
  afterTermTotals: PaymentSchedule;
  mortgageTotals: PaymentSchedule;
}
