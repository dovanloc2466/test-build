import React from 'react';
import { RouteChildrenProps } from 'react-router';

import { IApplicationRouteInfo } from '../Types';

export class ApplicationPage<P = Record<string, unknown>, S = Record<string, unknown>> extends React.Component<RouteChildrenProps<P, S>> {
  public static routeInfo: IApplicationRouteInfo;
}
