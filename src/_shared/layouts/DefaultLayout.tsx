import { Layout } from 'antd';
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import styled from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;

const SIDER_WIDTH = 250;

const _DefaultLayout = styled.div`
  
`;

interface IDefaultLayoutProps {

}

export const DefaultLayout = (props: React.PropsWithChildren<IDefaultLayoutProps>) => {
  const { } = props;
  const [value, setValue] = React.useState('');
  
  return (
    <_DefaultLayout>
      {props.children}
    </_DefaultLayout >
  );
};