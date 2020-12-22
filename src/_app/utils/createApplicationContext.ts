import { IApplicationContext } from 'libs/framework';

import { createApplicationUser } from './createApplicationUser';

export const createApplicationContext = (user): IApplicationContext => {
  if (!user) {
    return {};
  }

  return {
    applicationUser: user && createApplicationUser(user),
  };
};