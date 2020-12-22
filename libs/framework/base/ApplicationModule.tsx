import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { IApplicationModule } from '../Types';
import { ApplicationRouteGuard } from './ApplicationRouteGuard';

interface IApplicationModuleProps {
  readonly module: IApplicationModule;
}

export function ApplicationModule(props: React.PropsWithChildren<IApplicationModuleProps>) {
  const { module } = props;

  return (
    <Switch>
      {module.pages.map((page) => {
        return (
          <Route key={page.routeInfo.path} path={page.routeInfo.path}>
            {(routeProps) => (
              <ApplicationRouteGuard page={page} routeProps={routeProps} />
            )}
          </Route>
        );
      })}
      {module.defaultUrl && (<Route>{<Redirect to={module.defaultUrl} />}</Route>)}
    </Switch>
  );
}