
import React from 'react';
import styled from 'styled-components';

import { Forbid } from '@/_shared';

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
      <Forbid />
    </_DefaultView>
  );
};