import React from 'react';
import styled from 'styled-components';

const _Component = styled.div`
`;

interface IComponentProps {

}

export const Component = (props: React.PropsWithChildren<IComponentProps>) => {
  const { } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_Component>
      {props.children}
    </_Component>
  );
};