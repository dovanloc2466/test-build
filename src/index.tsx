import './index.scss';

import { ConfigProvider } from 'antd';
import vi_VN from 'antd/es/locale/vi_VN';
import { render } from 'libs/framework';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { initialize, IRootProps, Root } from './_app';
import { i18nResources } from './_shared';

function RootExtended(props: IRootProps) {
  return (
    <ConfigProvider locale={vi_VN}>
      <RecoilRoot>
        <Root {...props} />
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default () => {
  const container = document.getElementById('root')!;

  render({
    container,
    initialize,
    root: RootExtended,
    i18n: {
      defaultLangue: 'vi',
      resources: i18nResources
    }
  });
};