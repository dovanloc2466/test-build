import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const _AuthFormCard = styled.div`
  max-width: 340px;
  background-color: #fff;
  padding: 24px;
  margin: 0 auto;

  .auth-form-card-title {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 300;
  }
`;

interface IAuthFormCardProps {
  readonly title: string;
}

export const AuthFormCard = (props: React.PropsWithChildren<IAuthFormCardProps>) => {
  const { title } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_AuthFormCard>
      <Typography.Paragraph className="auth-form-card-title">
        {title}
      </Typography.Paragraph>
      {props.children}
    </_AuthFormCard>
  );
};