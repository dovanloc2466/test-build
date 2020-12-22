
import { allowAnonymous, ApplicationPage, i18n } from 'libs/framework';
import React from 'react';

import { AuthLayout } from '@/auth/layouts';

import { unauthorizedPath } from './PageUnauthorized.shared';
import { DefaultView } from './views';

export class PageUnauthorized extends ApplicationPage {
  public static routeInfo = {
    title: i18n('unauthorized'),
    path: unauthorizedPath,
    policies: [allowAnonymous]
  }

  public render() {
    return (
      <AuthLayout>
        <DefaultView />
      </AuthLayout>
    );
  }
}