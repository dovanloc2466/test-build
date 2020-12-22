import { ApplicationPage, i18n } from 'libs/framework';
import { allowAnonymous } from 'libs/framework/policies';
import React from 'react';

import { AuthLayout } from '@/auth/layouts';

import { loginPath } from './LoginPage.shared';
import { LoginFormView } from './views';

export class LoginPage extends ApplicationPage {
  public static routeInfo = {
    title: i18n('login'),
    path: loginPath,
    policies: [allowAnonymous]
  }

  public render() {
    return (
      <AuthLayout>
        <LoginFormView />
      </AuthLayout>
    );
  }
}