import { ApplicationPage, i18n } from 'libs/framework';
import { isAuthenticated } from 'libs/framework/policies';
import React from 'react';

import { DashboardLayout } from '@/dashboard/layouts';

import { dashboardPath } from './PageCashier.shared';
import { Casher } from './views';

export class PageCashier extends ApplicationPage {
  public static routeInfo = {
    title: i18n('Dashboard'),
    path: dashboardPath,
    policies: [isAuthenticated]
  }

  public render() {
    return (
      <DashboardLayout>
        <Casher />
      </DashboardLayout>
    );
  }
}