
import { objectToSearchParams, replaceRoutePath } from 'libs/framework/ultis';
import { modulePath } from '@/auth/configs';

export interface IPageForbidParams {
}

export interface IPageForbidSearch {
}

export const forbidPath =  `${modulePath}/forbid`;

export const getPageForbidUrl = (params?: IPageForbidParams, search?: IPageForbidSearch | string) => {
  const url = replaceRoutePath(forbidPath, params);

  const urlSearch = search
    ? typeof search === 'string' ? search : objectToSearchParams(search)
    : '';
    
  if(!urlSearch) {
    return url;
  }

  return `${url}?${urlSearch.toString()}`;
};