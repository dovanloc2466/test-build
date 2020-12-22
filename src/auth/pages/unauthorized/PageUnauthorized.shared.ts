
import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

import { modulePath } from '@/auth/configs';

export interface IPageUnauthorizedParams {
}

export interface IPageUnauthorizedSearch {
}

export const unauthorizedPath =  `${modulePath}/unauthorized`;

export const getPageUnauthorizedUrl = (params?: IPageUnauthorizedParams, search?: IPageUnauthorizedSearch | string) => {
  const url = replaceRoutePath(unauthorizedPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';
    
  if(!urlSearch) {
    return url;
  }

  return `${url}?${urlSearch.toString()}`;
};