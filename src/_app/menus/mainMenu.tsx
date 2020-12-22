import { IApplicationMenu } from 'libs/framework';
import React from 'react';

import DashboardModule from '@/dashboard';
import { DashboardOutlined } from '@ant-design/icons';

export const mainMenu: IApplicationMenu = {
  name: 'main',
  items: [
    {
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      url: DashboardModule.defaultUrl
    }
  ]
};