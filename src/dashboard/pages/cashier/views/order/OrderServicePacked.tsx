import { Tabs } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { ServicePacked, ServicePackedCategory } from '@/_shared';

import { ListServicePacked } from '../list-service-packed';

const _OrderServicePacked = styled.div`
  .ant-tabs-tab{
    text-transform : uppercase;
    padding: 20px 30px !important;
    border-radius : 10px;
    background : #ffffff;
    margin: 0 0 20px  !important;
    height: 100px;
    font-size: 18px;
    font-weight :700;
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

interface IOrderServicePackedProps {
  servicePackeds?: ServicePacked[];
  servicePackedCategorys?: ServicePackedCategory[];
  category?: string;
  selectServicePacked: (e) => void;

}

export const OrderServicePacked = (props: React.PropsWithChildren<IOrderServicePackedProps>) => {
  const { servicePackeds, servicePackedCategorys, category, selectServicePacked } = props;

  React.useEffect(() => {
    //** effect here */
  });

  if (!servicePackeds || !servicePackedCategorys || category !== 'service package') {
    return null;
  }

  const newServicePackedCategorys = servicePackedCategorys;

  if (!newServicePackedCategorys.find(e => e.id == 0)) {
    newServicePackedCategorys.push({
      id: 0,
      name: 'Gói dịch vụ khác',
      packages: [],
      status: 'ENABLE'
    } as ServicePackedCategory);
  }
  newServicePackedCategorys.map(
    e => {
      e.packages = [];
      servicePackeds.map(
        servicePacked => {
          if (e.id === servicePacked.packageCategoryId || (e.id == 0 && servicePacked.packageCategoryId == null)) {
            e.packages.push(servicePacked);
          }
        }
      );
    }
  );

  return (
    <_OrderServicePacked>
      <Tabs tabPosition='left'>
        {newServicePackedCategorys.map((e, index) => {
          if (e.packages.length == 0) {
            return null;
          }
          return (
            <Tabs.TabPane tab={e.name} key={index}>
              <ListServicePacked selectServicePacked={selectServicePacked} servicePacked={e.packages} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </_OrderServicePacked>
  );
};