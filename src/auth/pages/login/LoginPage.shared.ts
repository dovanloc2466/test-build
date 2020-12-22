
import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';

import { modulePath } from '@/auth/configs';

export interface IPageLoginParams {
}

export interface IPageLoginSearch {
}

export const loginPath =  `${modulePath}/login`;

export const getPageLoginUrl = (params?: IPageLoginParams, search?: IPageLoginSearch | string) => {
  const url = replaceRoutePath(loginPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';
    
  if(!urlSearch) {
    return url;
  }

  return `${url}?${urlSearch.toString()}`;
};