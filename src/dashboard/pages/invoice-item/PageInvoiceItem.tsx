import { ApplicationPage, i18n } from 'libs/framework';
import { isAuthenticated } from 'libs/framework/policies';
import React from 'react';

import { DashboardLayout } from '@/dashboard/layouts';

import { invoiceItemPath } from './PageInvoiceItem.shared';
import { InvoiceItem } from './views/InvoiceItem';

export class PageInvoiceItem extends ApplicationPage {
  public static routeInfo = {
    title: i18n('invoice-item'),
    path: invoiceItemPath,
    policies: [isAuthenticated]
  }

  public render() {
    return (
      <DashboardLayout>
        <InvoiceItem />
      </DashboardLayout>
    );
  }
}