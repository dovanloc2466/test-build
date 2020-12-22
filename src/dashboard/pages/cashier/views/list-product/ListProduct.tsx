import { Col, Row } from 'antd';
import { currency } from 'libs/framework';
import React from 'react';
import styled from 'styled-components';

import { Product } from '@/_shared';

const _ListProduct = styled.div`
.product{
    height: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background:#ffffff;
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

interface IListProductProps {
  products: Product[];
  selectProduct: (e: Product) => void;
}

export const ListProduct = (props: React.PropsWithChildren<IListProductProps>) => {
  const { products, selectProduct } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_ListProduct>
      <Row gutter={20}>
        {products.map((e, index) => {
          return (
            <Col
              onClick={
                () => {
                  selectProduct(e);
                }
              }
              key={index}
              className="gutter-row"
              span={12}
            >
              <div className='product'>
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
    </_ListProduct>
  );
};