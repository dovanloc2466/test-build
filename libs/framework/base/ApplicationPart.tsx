import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ApplicationModule } from './ApplicationModule';
import { ApplicationState } from './ApplicationState';

interface IApplicationPartProps {
  readonly path: string;
  readonly layout?: React.ComponentType<unknown>;
  readonly children?: JSX.Element | JSX.Element[];
}

export function ApplicationPart(props: React.PropsWithChildren<IApplicationPartProps>) {
  const {
    layout: Layout = React.Fragment,
    children
  } = props;

  if (!children) {
    return null;
  }

  const routes = React.Children.map(
    children,
    (child: JSX.Element) => {
      if (child?.type === ApplicationModule) {
        ApplicationState.push(child.props.module);

        return (
          <Route path={child.props.module.path}>
            {child}
          </Route>
        );
      }

      return null;
    });

  return (
    <Layout>
      <Switch>
        {routes}
      </Switch>
    </Layout>
  );
}