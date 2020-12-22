import { Tabs } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Service, ServiceCategory } from '@/_shared';

import { ListService } from '../list-service';

const _OrderService = styled.div`
  .ant-tabs-tab{
    text-transform : uppercase;
    padding: 20px 30px !important;
    border-radius : 10px;
    background : #ffffff;
    margin: 0 0 20px  !important;
    height: 100px;
    font-size: 18px;
    font-weight :700;
    color: rgb(148 148 148);
    width : 200px;
    white-space: initial;
    &:hover {
     color: #00bedf
    }
    &.ant-tabs-tab{
      font-weight: 700;
      color: #878787;
      text-align: left;
    }
    &.ant-tabs-tab-active{
      color: #ffffff;
      font-weight: 500;
      background: #00bedf;
    }
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display : none;
  }
`;

interface IOrderServiceProps {
  service?: ServiceCategory[];
  category?: string;
  selectService: (e: Service) => void;
}

export const OrderService = (props: React.PropsWithChildren<IOrderServiceProps>) => {
  const { service, category, selectService } = props;

  React.useEffect(() => {
    //** effect here */
  });

  if (!service || category !== 'service') {
    return null;
  }

  return (
    <_OrderService>
      <Tabs tabPosition='left'>
        {service.map((e, index) => {
          return (
            <Tabs.TabPane tab={e.name} key={index}>
              <ListService selectService={selectService} service={e.service} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </_OrderService>
  );
};