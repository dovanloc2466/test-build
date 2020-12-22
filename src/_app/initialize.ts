import { fetchUser } from './initialize-fetch';
import { IRootProps } from './Root';
import { createApplicationContext } from './utils';

export const initialize = async (): Promise<IRootProps> => {
  const user = await fetchUser();

  return {
    initialContext: createApplicationContext(user),
    user: user
  };
};