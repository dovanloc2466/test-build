
import React from 'react';
import styled from 'styled-components';

import { CustomerSearch } from './CustomerSearch';

const _CustomerView = styled.div`
`;
interface IDefaultViewProps {

}

export const CustomerView = (props: React.PropsWithChildren<IDefaultViewProps>) => {
  const { } = props;

  return (
    <_CustomerView>
      <CustomerSearch />
    </_CustomerView>
  );
};