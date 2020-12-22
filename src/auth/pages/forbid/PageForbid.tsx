
import { ApplicationPage, i18n, isAuthenticated } from 'libs/framework';
import React from 'react';

import { AuthLayout } from '@/auth/layouts';

import { forbidPath } from './PageForbid.shared';
import { DefaultView } from './views';

export class PageForbid extends ApplicationPage {
  public static routeInfo = {
    title: i18n('forbid'),
    path: forbidPath,
    policies: [isAuthenticated]
  }

  public render() {
    return (
      <AuthLayout>
        <DefaultView />
      </AuthLayout>
    );
  }
}