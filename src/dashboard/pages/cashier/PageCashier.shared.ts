import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

export interface IDashboardPageParams {
}

export interface IDashboardPageSearch {
}

export const dashboardPath = '/casher';

export const getDashboardUrl = (params?: IDashboardPageParams, search?: IDashboardPageSearch | string) => {
  const url = replaceRoutePath(dashboardPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';

  return `${url}?${urlSearch.toString()}`;
};