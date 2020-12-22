import { Tabs } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Product, ProductCategory } from '@/_shared';

import { ListProduct } from '../list-product';

const _OrderProduct = styled.div`
  .ant-tabs-tab{
    text-transform : uppercase;
    padding: 20px 30px !important;
    border-radius : 10px;
    background : #ffffff;
    margin: 0 0 20px  !important;
    height: 100px;
    font-size: 18px;
    width : 200px;
    color: rgb(148 148 148);
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
      background:#00bedf;
    }
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display : none;
  }
`;

interface IOrderProductProps {
  products?: Product[];
  category?: string;
  productCategorys?: ProductCategory[];
  selectProduct: (e: Product) => void;
}

export const OrderProduct = (props: React.PropsWithChildren<IOrderProductProps>) => {
  const { products, category, productCategorys, selectProduct } = props;

  React.useEffect(() => {
    //** effect here */
  });

  if (!products || !productCategorys || category !== 'product') {
    return null;
  }

  const newProductCategorys = productCategorys;
  newProductCategorys.map(productCategory => {
    if (productCategory.product.length === 0) {
      products.map(e => {
        if (e.productCategoryId === productCategory.id) {
          productCategory.product.push(e);
        }
      });
    }
  });

  return (
    <_OrderProduct>
      <Tabs tabPosition='left'>
        {newProductCategorys.map(e => {
          if (e.product.length == 0) {
            return null;
          }
          return (
            <Tabs.TabPane tab={e.name} key={e.id}>
              <ListProduct selectProduct={selectProduct} products={e.product} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </_OrderProduct>
  );
};