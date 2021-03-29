import {range} from 'lodash';

export class MortgageUtils {

  static readonly NumberPattern = /^(?!,$)[\d,.]+$/;

  static getAmortizationYears = (): {label: string, value: number}[] => {
    return range(1, 31).map(year => ({label: `${year} ${year > 1 ? 'Years' : 'Year'}` , value: year}));
  }

  static getPaymentFrequencies(): {label: string, value: number}[] {
    return [
      {label: 'Weekly', value: 52},
      {label: 'Bi-Weekly(every 2 weeks)', value: 26},
      {label: 'Semi-monthly(24x per year)', value: 24},
      {label: 'Monthly(12x per year)', value: 12 }
    ];
  }

  static getTerms = (): {label: string, value: number}[] => {
    return range(1, 11).map(year => ({label: `${year} ${year > 1 ? 'Years' : 'Year'}` , value: year}));
  }
}
