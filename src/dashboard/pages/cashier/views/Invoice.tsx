import { Button } from 'antd';
import { currency } from 'libs/framework';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
    BookingItem,
    currentCustomerState,
    invoiceItem as invoiceItemState
} from '@/_shared';
import { DeleteOutlined } from '@ant-design/icons';

const _Invoice = styled.div`
  display :flex;
  flex-direction: column;
  padding-left : 20px;
  height: calc(100vh - 105px);
  .customer-profile{
    display : flex;
    align-items : center;
    height: 100px;
    background: #ffffff;
    border-radius: 10px;
    padding: 10px 20px;
    .avatar {
      height : 50px;
      width : 50px;
      margin-right :10px;
      img {
        width :100%;
        height: 100%;
        border-radius : 50%;
      }
    }
    p {
      margin : 0;
      font-size: 20px;
      color: #545455;
    }
  }
  .selected-service{
    overflow: scroll;
    margin-top: 20px;
    flex : 1;
    margin-bottom : auto;
    &-item {
      display:flex;
      justify-content: space-between;
      align-items :center;
      margin-bottom: 20px;
      background : #ffffff;
      padding : 10px 20px;
      border-radius : 10px;
      height: 100px;
      label {
        font-size: 20px;
        font-weight: 700;
        color: #00bedf;
      }
      p{
        margin: 0;
        color: #029db8;
        font-size: 16px;
        font-weight: 500;
      }
      span{
        color: red;
        padding: 10px;
        border: 1px solid red;
        border-radius: 3px;
      }
    }
  }
  .button-submit {
    width: 100%;
    height: 100px;
    background: #00bedf;
    color: #ffffff;
    font-size: 30px;
    border-radius: 10px;
    text-transform: uppercase;
  }
  .price{
    font-size: 20px;
    margin: 10px 0;
    color: #00bedf;
    font-weight: 700;
    span{
      font-weight : 700;
    }
  }
`;

interface IInvoiceProps {
  invoiceItems?: BookingItem[];
  onDelete: (e: BookingItem) => void;
  submit: () => void;
}

export const Invoice = (props: React.PropsWithChildren<IInvoiceProps>) => {
  const { invoiceItems, onDelete, submit } = props;

  const [, setInvoiceItem] = useRecoilState(invoiceItemState);

  const [currentCustomer,] = useRecoilState(currentCustomerState);

  const history = useHistory();

  React.useEffect(() => {
    //** effect here */
  });

  let totalPrice = 0;
  
  return (
    <_Invoice>
      <Link to='/'>
        <div className='customer-profile'>
          <div className='avatar'>
            <img src="https://docsach24.com/no-avatar.png" />
          </div>
          <p className='name-customer'>
            {currentCustomer ? currentCustomer.name : 'Khách lẻ'}
          </p>
        </div>
      </Link>
      <div className='selected-service'>
        {
          invoiceItems?.map((e, index) => {
            totalPrice = totalPrice + e.price;
            return (
              <div
                className='selected-service-item'
                key={index}
              >
                <div>
                  <label onClick={async () => {
                    await setInvoiceItem(e);
                    return history.push(`/invoice-item/${index}`);
                  }}>
                    {e.name}
                  </label>
                  <p>{currency(e.price)}</p>
                </div>
                <DeleteOutlined onClick={
                  () => {
                    onDelete(e);
                  }} />
              </div>
            );
          })
        }
      </div>
      <div className='price'>
        Tổng giá :<span>{currency(totalPrice)} </span>
      </div>
      <Button onClick={
        () => {
          submit();
        }
      } className='button-submit'>
        Order
      </Button>
    </_Invoice >
  );
};

