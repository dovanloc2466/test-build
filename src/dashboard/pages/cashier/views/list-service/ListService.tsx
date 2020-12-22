import { Col, Row } from 'antd';
import { currency } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { Service } from '@/_shared';

const _ListService = styled.div`
  .service{
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

interface IListServiceProps {
  service: Service[];
  selectService: (e: Service) => void;
}

export const ListService = (props: React.PropsWithChildren<IListServiceProps>) => {
  const { service, selectService } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_ListService>
      <Row gutter={20}>
        {service.map((e, index) => {
          return (
            <Col onClick={
              () => {
                selectService(e);
              }
            }
              key={index}
              className="gutter-row"
              span={12}
            >
              <div className='service'>
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
    </_ListService >
  );
};