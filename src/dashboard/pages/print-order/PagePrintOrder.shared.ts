
import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

export interface IPagePrintOrderParams {
}

export interface IPagePrintOrderSearch {
}

export const printOrderPath = '/print-order';

export const getPagePrintOrderUrl = (params?: IPagePrintOrderParams, search?: IPagePrintOrderSearch | string) => {
  const url = replaceRoutePath(printOrderPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';

  if (!urlSearch) {
    return url;
  }

  return `${url}?${urlSearch.toString()}`;
};