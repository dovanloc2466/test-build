import { Alert } from 'antd';
import React from 'react';
import styled from 'styled-components';

const _AlertError = styled.div`
  margin-bottom: 24px;
`;

interface IAlertErrorProps {
  readonly message?: string;
}

export const AlertError = (props: React.PropsWithChildren<IAlertErrorProps>) => {
  const { message } = props;

  React.useEffect(() => {
    //** effect here */
  });

  if (!message) {
    return null;
  }

  return (
    <_AlertError>
      <Alert message={message} type="error" />
    </_AlertError>
  );
};