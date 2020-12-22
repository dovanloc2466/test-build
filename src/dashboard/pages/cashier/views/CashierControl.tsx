import { Button, Radio } from 'antd';
import { redirect } from 'libs/framework';
import { removeStoreAccessToken } from 'libs/restful';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { currentUserState } from '@/_shared';
import { LogoutOutlined } from '@ant-design/icons';

const _CashierControl = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background :#ffffff;
  .logo{
    width: 150px;
    margin: 10px;
    img{
      width :100%;
      height: auto;
    }
  }
  .ant-radio-group  {
    .ant-radio-button-wrapper{
      &:hover {
       color: #00bedf;
      }
    }
    .ant-radio-button-wrapper-checked{
      background: #00bedf;
      border-color: #00bedf;
      &:before{
        background-color: #00bedf;
      }
      &:hover {
       color: #ffffff;
       background: #00bedf;
       border-color: #00bedf;
      }
    }
  }
  .profile{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
      border: none;
      box-shadow: none;
      color :red;
    }
  }
  .group-radio-control{
    .ant-radio-button-wrapper{
      height: 68px !important;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 18px 40px;
      border: none;
      border-radius :10px;
      &:before{
       display:none;
      }
    }
  }
`;

interface ICashierControlProps {
  readonly changeTab: (e: string) => void;
}

export const CashierControl = (props: React.PropsWithChildren<ICashierControlProps>) => {
  const { changeTab } = props;

  React.useEffect(() => {
    //** effect here */
  });

  const [currenUser,] = useRecoilState(currentUserState);

  return (
    <_CashierControl>
      <div className='logo'>
        <img src="/static/logo.png" alt="" />
      </div>
      <Radio.Group
        onChange={
          (e) => {
            changeTab(e.target.value);
          }}
        defaultValue="service"
        buttonStyle="solid"
        className='group-radio-control'
      >
        <Radio.Button value="service">Dịch vụ</Radio.Button>
        <Radio.Button value="product">Sản phẩm</Radio.Button>
        <Radio.Button value="service package">Gói dịch vụ</Radio.Button>
      </Radio.Group>
      <div className='profile'>
        <h3>
          {currenUser?.name}
        </h3>
        <Button onClick={
          () => {
            removeStoreAccessToken();
            return redirect('/');
          }}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </div>
    </_CashierControl >
  );
};