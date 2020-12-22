import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

export interface IDashboardPageParams {
}

export interface IDashboardPageSearch {
}

export const invoiceItemPath = '/invoice-item/:index';

export const getInvoiceItemUrl = (params?: IDashboardPageParams, search?: IDashboardPageSearch | string) => {
  const url = replaceRoutePath(invoiceItemPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';

  return `${url}?${urlSearch.toString()}`;
};