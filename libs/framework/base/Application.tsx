import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router';
import { Switch } from 'react-router-dom';

import { IApplicationContext } from '../Types';
import { ApplicationContext } from './ApplicationContext';
import { ApplicationPart } from './ApplicationPart';

const history = createBrowserHistory();

interface IApplicationProps {
  readonly children: JSX.Element | JSX.Element[];
}

export const Application = (props: IApplicationProps) => {
  const { children } = props;

  if (!props.children) {
    return null;
  }


  const routes: JSX.Element[] = [];

  React.Children.forEach(children, (child) => {
    if (child.type === ApplicationPart) {
      routes.push(
        <Route key={child.props.path} path={child.props.path} exact={false}>
          {child}
        </Route>
      );
    }
  });

  return (
    <Router history={history}>
      <Switch>
        {routes}
      </Switch>
    </Router>
  );
};
