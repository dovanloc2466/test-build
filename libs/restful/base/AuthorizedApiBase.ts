import React from 'react';

import { unauthorizedPageUrl } from '../configs';
import { removeStoreAccessToken } from '../utils';

/**
 * Configuration class needed in base class.
 * The config is provided to the API client at initialization time.
 * API clients inherit from #AuthorizedApiBase and provide the config.
 */
export class IApiClientConfig {
  /**
   * Returns a valid value for the Authorization header.
   * Used to dynamically inject the current auth header.
   */
  getAuthorization: () => string | undefined;
}

export class AuthorizedApiBase {
  protected readonly config: IApiClientConfig;

  constructor(config: IApiClientConfig) {
    this.config = config;
  }

  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    options.headers = {
      ...options.headers
    };

    const token = this.config.getAuthorization();

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return Promise.resolve(options);
  };

  protected getBaseUrl = (...args: (string | undefined)[]) => {
    return API_URL;
  }

  protected transformResult = (url: string, response: Response, callback: (_response: Response) => Promise<any>) => {
    if (response.status === 401) {
      removeStoreAccessToken();
      location.href = unauthorizedPageUrl;
    }

    return callback(response);
  }
}