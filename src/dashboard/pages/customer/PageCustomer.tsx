
import { ApplicationPage, i18n, isAuthenticated } from 'libs/framework';
import React from 'react';

import { customerPath } from './PageCustomer.shared';
import { CustomerView } from './views';

export class PageCustomer extends ApplicationPage {
  public static routeInfo = {
    title: i18n('customer'),
    path: customerPath,
    policies: [isAuthenticated]
  }

  public render() {
    return (
      <div>
        <CustomerView />
      </div>
    );
  }
}