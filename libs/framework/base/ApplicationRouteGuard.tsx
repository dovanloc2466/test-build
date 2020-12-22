import React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';

import { deniedUrl } from '../config';
import { ApplicationAccessControl } from './ApplicationAccessControl';
import { ApplicationPage } from './ApplicationPage';

interface IApplicationRouteGuardProps {
  readonly page: typeof ApplicationPage;
  readonly routeProps: RouteChildrenProps;
}

export const ApplicationRouteGuard = (props: IApplicationRouteGuardProps) => {
  const {
    page: Page,
    routeProps
  } = props;

  return (
    <ApplicationAccessControl policies={Page.routeInfo.policies}>
      {(accessResult) => {

        if (typeof accessResult === 'string') {
          return <Redirect to={accessResult} />;
        }

        if (!accessResult) {
          return <Redirect to={deniedUrl} />;
        }

        return <Page {...routeProps} />;
      }}
    </ApplicationAccessControl>
  );
};