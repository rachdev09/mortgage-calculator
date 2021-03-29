import {TestBed} from '@angular/core/testing';
import {MortgageService} from '@mortgage-calculator/mortgage.service';

const paymentSchedule = [{endingBalance: 8642.657492393382, interestPayment: 37.5, principalPayment: 357.34250760661735, totalPayment: 394.84250760661735}, {endingBalance: 8283.826057671737, interestPayment: 36.01107288497243, principalPayment: 358.83143472164494, totalPayment: 394.84250760661735}, {endingBalance: 7923.499491972085, interestPayment: 34.515941906965566, principalPayment: 360.3265656996518, totalPayment: 394.84250760661735}, {endingBalance: 7561.671565582018, interestPayment: 33.014581216550354, principalPayment: 361.827926390067, totalPayment: 394.84250760661735}, {endingBalance: 7198.3360228319925, interestPayment: 31.50696485659174, principalPayment: 363.3355427500256, totalPayment: 394.84250760661735}, {endingBalance: 6833.486581987175, interestPayment: 29.99306676179997, principalPayment: 364.84944084481737, totalPayment: 394.84250760661735}, {endingBalance: 6467.116935138837, interestPayment: 28.472860758279893, principalPayment: 366.3696468483374, totalPayment: 394.84250760661735}, {endingBalance: 6099.220748095298, interestPayment: 26.946320563078487, principalPayment: 367.8961870435389, totalPayment: 394.84250760661735}, {endingBalance: 5729.791660272412, interestPayment: 25.41341978373041, principalPayment: 369.4290878228869, totalPayment: 394.84250760661735}, {endingBalance: 5358.823284583596, interestPayment: 23.874131917801716, principalPayment: 370.9683756888156, totalPayment: 394.84250760661735}, {endingBalance: 4986.309207329411, interestPayment: 22.328430352431653, principalPayment: 372.5140772541857, totalPayment: 394.84250760661735}, {endingBalance: 4612.242988086667, interestPayment: 20.776288363872546, principalPayment: 374.0662192427448, totalPayment: 394.84250760661735}, {endingBalance: 4236.6181595970775, interestPayment: 19.217679117027778, principalPayment: 375.62482848958956, totalPayment: 394.84250760661735}, {endingBalance: 3859.4282276554477, interestPayment: 17.652575664987822, principalPayment: 377.18993194162954, totalPayment: 394.84250760661735}, {endingBalance: 3480.6666709973947, interestPayment: 16.080950948564364, principalPayment: 378.761556658053, totalPayment: 394.84250760661735}, {endingBalance: 3100.3269411866, interestPayment: 14.502777795822478, principalPayment: 380.3397298107949, totalPayment: 394.84250760661735}, {endingBalance: 2718.4024625015936, interestPayment: 12.918028921610833, principalPayment: 381.92447868500653, totalPayment: 394.84250760661735}, {endingBalance: 2334.886631822066, interestPayment: 11.326676927089974, principalPayment: 383.51583067952737, totalPayment: 394.84250760661735}, {endingBalance: 1949.7728185147075, interestPayment: 9.72869429925861, principalPayment: 385.1138133073587, totalPayment: 394.84250760661735}, {endingBalance: 1563.054364318568, interestPayment: 8.124053410477948, principalPayment: 386.7184541961394, totalPayment: 394.84250760661735}, {endingBalance: 1174.7245832299448, interestPayment: 6.512726517994033, principalPayment: 388.3297810886233, totalPayment: 394.84250760661735}, {endingBalance: 784.7767613867854, interestPayment: 4.894685763458103, principalPayment: 389.94782184315926, totalPayment: 394.84250760661735}, {endingBalance: 393.204156952613, interestPayment: 3.2699031724449394, principalPayment: 391.57260443417243, totalPayment: 394.84250760661735}, {endingBalance: 0, interestPayment: 1.6383506539692207, principalPayment: 393.204156952613, totalPayment: 394.8425076065822}];
const paymentTotals = {afterTermTotals: {endingBalance: 0, interestPayment: 106.64942407567834, principalPayment: 4236.6181595970775, totalPayment: 4343.267583672756}, mortgageTotals: {endingBalance: 0, interestPayment: 476.2201825587808, principalPayment: 9000, totalPayment: 9476.220182558785}, termTotals: {endingBalance: 4612.242988086667, interestPayment: 369.57075848310257, principalPayment: 4763.381840402922, totalPayment: 5132.952598886026}, yearTotals: [{endingBalance: 4612.242988086667, interestPayment: 350.3530793660748, principalPayment: 4387.7570119133325, totalPayment: 4738.110091279408}, {endingBalance: 0, interestPayment: 125.8671031927061, principalPayment: 4612.242988086667, totalPayment: 4738.110091279373}]};

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate numOfPayments and numOfTermPayments based on payment plan', () => {
    service.paymentPlan = {
      mortgageAmount: 100000,
      principal: 900000,
      interestRate: 5,
      amortizationYears: 4,
      paymentFrequency: 12,
      term: 2,
      downpaymentPercentage: 10,
      downpaymentAmount: 10000
    };
    expect(service.numOfPayments).toBe(48);
    expect(service.numOfTermPayments).toBe(24);
    service.paymentPlan = {
      mortgageAmount: 100000,
      principal: 900000,
      interestRate: 5,
      amortizationYears: 25,
      paymentFrequency: 24,
      term: 5,
      downpaymentPercentage: 10,
      downpaymentAmount: 10000
    };
    expect(service.numOfPayments).toBe(600);
    expect(service.numOfTermPayments).toBe(120);
  });

  it('should calculate mortgage based on payment plan', () => {
    service.paymentPlan = {
      mortgageAmount: 10000,
      principal: 90000,
      interestRate: 5,
      amortizationYears: 2,
      paymentFrequency: 12,
      term: 1,
      downpaymentPercentage: 10,
      downpaymentAmount: 1000
    };
    service.calculateMortgage(service.paymentPlan);

    // Payment Schedule
    expect(service.paymentSchedule).toEqual(paymentSchedule);

    // Payment Totals
    expect(service.paymentTotals).toEqual(paymentTotals);

    // Getters for payment schedule and totals
    expect(service.mortgagePayment).toBeCloseTo(394.84);
    expect(service.principalTermPayment).toBeCloseTo(4763.38);
    expect(service.principalPayment).toBeCloseTo(9000);
    expect(service.interestTermPayment).toBeCloseTo(369.57);
    expect(service.interestPayment).toBeCloseTo(476.22);
    expect(service.totalTermPayment).toBeCloseTo(5132.95);
    expect(service.totalPayment).toBeCloseTo(9476.22);
    expect(service.afterTermBalance).toBeCloseTo(4236.62);
  });


});
