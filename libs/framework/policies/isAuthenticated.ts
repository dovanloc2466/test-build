import { ApplicationPolicy } from '../Types';

export const isAuthenticated: ApplicationPolicy = (appContext) => {
  if(!appContext.applicationUser) {
    return '/auth/login';
  }
  
  return true;
};