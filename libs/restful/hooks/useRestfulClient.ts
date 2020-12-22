import * as React from 'react';

import { IApiClientConfig } from '../_gen';
import { getStoredAccessToken } from '../utils';

const clientInstanceCache = {};

export const useRestfulClient = <T>(
  RestfulClient: { new(configuration: IApiClientConfig): T },
  useAccessToken = true
): T => {
  const [clientInstance] = React.useState<T>(
    clientInstanceCache[RestfulClient.name] ??
    new RestfulClient({
      getAuthorization: () => useAccessToken ? getStoredAccessToken() : undefined
    })
  );

  if (!clientInstance) {
    clientInstanceCache[RestfulClient.name] = clientInstance;
  }

  return clientInstance;
};
