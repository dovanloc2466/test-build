
import { ApplicationPage, i18n, isAuthenticated } from 'libs/framework';
import React from 'react';

import { printOrderPath } from './PagePrintOrder.shared';
import { PrintOrderView } from './views';

export class PagePrintOrder extends ApplicationPage {
  public static routeInfo = {
    title: i18n('in hóa đơn'),
    path: printOrderPath,
    policies: [isAuthenticated]
  }

  public render() {
    return (
      <div /*style={{ display: 'none' }}*/ >
        <PrintOrderView />
      </div>
    );
  }
}