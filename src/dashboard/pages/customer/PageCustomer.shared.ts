
import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

export interface IPageCustomerParams {
}

export interface IPageCustomerSearch {
}

export const customerPath = '/';

export const getPageCustomerUrl = (params?: IPageCustomerParams, search?: IPageCustomerSearch | string) => {
  const url = replaceRoutePath(customerPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';

  if (!urlSearch) {
    return url;
  }

  return `${url}?${urlSearch.toString()}`;
};