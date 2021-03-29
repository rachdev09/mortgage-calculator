import {MortgageUtils} from '@mortgage-calculator/mortgage.utils';

describe('MortgageUtils', () => {

  it('should test Numbers Pattern', () => {
    expect(MortgageUtils.NumberPattern.test('10000')).toEqual(true);
    expect(MortgageUtils.NumberPattern.test('4,000')).toEqual(true);
    expect(MortgageUtils.NumberPattern.test('537.45')).toEqual(true);
    expect(MortgageUtils.NumberPattern.test('10,0000.56')).toEqual(true);
    expect(MortgageUtils.NumberPattern.test('100,000')).toEqual(true);

    expect(MortgageUtils.NumberPattern.test('abcdef')).toEqual(false);
  });

  it('getAmortizationYears should return years list', () => {
    expect(MortgageUtils.getAmortizationYears()).toEqual([
      {label: '1 Year', value: 1},
      {label: '2 Years', value: 2},
      {label: '3 Years', value: 3},
      {label: '4 Years', value: 4},
      {label: '5 Years', value: 5},
      {label: '6 Years', value: 6},
      {label: '7 Years', value: 7},
      {label: '8 Years', value: 8},
      {label: '9 Years', value: 9},
      {label: '10 Years', value: 10},
      {label: '11 Years', value: 11},
      {label: '12 Years', value: 12},
      {label: '13 Years', value: 13},
      {label: '14 Years', value: 14},
      {label: '15 Years', value: 15},
      {label: '16 Years', value: 16},
      {label: '17 Years', value: 17},
      {label: '18 Years', value: 18},
      {label: '19 Years', value: 19},
      {label: '20 Years', value: 20},
      {label: '21 Years', value: 21},
      {label: '22 Years', value: 22},
      {label: '23 Years', value: 23},
      {label: '24 Years', value: 24},
      {label: '25 Years', value: 25},
      {label: '26 Years', value: 26},
      {label: '27 Years', value: 27},
      {label: '28 Years', value: 28},
      {label: '29 Years', value: 29},
      {label: '30 Years', value: 30},
    ]);
  });

  it('getPaymentFrequencies should return frequencies list', () => {
    expect(MortgageUtils.getPaymentFrequencies()).toEqual([
      {label: 'Weekly', value: 52},
      {label: 'Bi-Weekly(every 2 weeks)', value: 26},
      {label: 'Semi-monthly(24x per year)', value: 24},
      {label: 'Monthly(12x per year)', value: 12 }
    ]);
  });

  it('getTerms should return terms list', () => {
    expect(MortgageUtils.getTerms()).toEqual([
      {label: '1 Year', value: 1},
      {label: '2 Years', value: 2},
      {label: '3 Years', value: 3},
      {label: '4 Years', value: 4},
      {label: '5 Years', value: 5},
      {label: '6 Years', value: 6},
      {label: '7 Years', value: 7},
      {label: '8 Years', value: 8},
      {label: '9 Years', value: 9},
      {label: '10 Years', value: 10}
    ]);
  });

});
