import { Layout, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const _AuthLayout = styled.div`
  .auth-layout {
    min-height: 100vh;
  }
  .auth-header {
    text-align: center;
    font-size: 18px;
    padding-top: 17px;
    background: #ffffff;
  }
  .auth-layout-content {
    display: flex;
    flex-direction: column;
    .auth-page {
      background-image :url('/static/background-login.jpg');
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
`;

interface IAuthLayoutProps {
}

export const AuthLayout = (props: React.PropsWithChildren<IAuthLayoutProps>) => {
  return (
    <_AuthLayout>
      <Layout className="auth-layout">
        <Layout.Content className="auth-layout-content">
          <div className="auth-header">
            <p><b>EASYSALON</b></p>
          </div>
          <div className="auth-page">
            {props.children}
          </div>
        </Layout.Content>
      </Layout>
    </_AuthLayout>
  );
};