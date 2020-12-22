
import React from 'react';
import styled from 'styled-components';

import { Unauthorized } from '@/_shared';

import { loginPath } from '../../login/LoginPage.shared';

const _DefaultView = styled.div`

`;

interface IDefaultViewProps {

}

export const DefaultView = (props: React.PropsWithChildren<IDefaultViewProps>) => {
  const { } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_DefaultView>
      <Unauthorized backUrl={loginPath}/>
    </_DefaultView>
  );
};