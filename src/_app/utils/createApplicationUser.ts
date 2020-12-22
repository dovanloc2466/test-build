import { IApplicationUser } from 'libs/framework';

export const createApplicationUser = (user): IApplicationUser => {
  return {
    displayName: user.email!,
    email: user.email!,
    id: user.id,
    username: user.userName ?? user.email!
  };
};