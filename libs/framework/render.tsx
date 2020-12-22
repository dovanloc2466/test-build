import React from 'react';
import ReactDOM from 'react-dom';

import { ApplicationContext } from './base';
import { setupI18n } from './hooks/setupI18n';
import { CreateTranslatiorProps } from './i18n';
import { IApplicationRootProps } from './Types';

interface IApplicationRenderProps {
  readonly container: HTMLElement;
  readonly root: React.ComponentType<IApplicationRootProps>;
  readonly i18n: CreateTranslatiorProps,
  readonly initialize: () => Promise<IApplicationRootProps>;
}

export const render = async (props: IApplicationRenderProps) => {
  const { initialize, container, i18n, root: Root } = props;

  setupI18n(i18n);

  const rootProps = await initialize();

  ReactDOM.render(
    (
      <ApplicationContext.Provider value={rootProps.initialContext}>
        <Root {...rootProps} />
      </ApplicationContext.Provider>
    ),
    container
  );
};