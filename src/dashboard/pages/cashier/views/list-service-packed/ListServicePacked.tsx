import { Col, Row } from 'antd';
import { currency } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { ServicePacked } from '@/_shared';

const _ListServicePacked = styled.div`
  .service-packed{
    height: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    label {
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: 700;
      color: #00bedf;
    }
    p {
      margin:0;
      color: #029db8;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

interface IListServicePackedProps {
  servicePacked: ServicePacked[];
  selectServicePacked: (e: ServicePacked) => void;
}

export const ListServicePacked = (props: React.PropsWithChildren<IListServicePackedProps>) => {
  const { servicePacked, selectServicePacked } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_ListServicePacked>
      <Row gutter={20}>
        {servicePacked.map((e, index) => {
          return (
            <Col
              onClick={
                () => {
                  selectServicePacked(e);
                }}
              key={index}
              className="gutter-row"
              span={12}
            >
              <div className='service-packed'>
                <label>
                  {e.name}
                </label>
                <p>
                  {currency(e.price)}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </_ListServicePacked>
  );
};