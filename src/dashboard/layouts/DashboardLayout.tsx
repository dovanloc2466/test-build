import React from 'react';
import styled from 'styled-components';

const _DashboardLayout = styled.div`
    background: #f1f2f4;
    min-height: calc(100vh);
`;

interface IDashboardLayoutProps {

}

export const DashboardLayout = (props: React.PropsWithChildren<IDashboardLayoutProps>) => {
  const { } = props;

  React.useEffect(
    () => {
      //** effect here */
    }
  );

  return (
    <_DashboardLayout>
      {props.children}
    </_DashboardLayout>
  );
};