import { Button, Col, Form, Input, Row, Select } from 'antd';
import axios from 'axios';
import { currency } from 'libs/framework';
import { getStoredAccessToken } from 'libs/restful';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import Keyboard from 'react-simple-keyboard';
import KeyboardReact from 'react-simple-keyboard';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
    BookingItem,
    invoiceItem,
    listBooking,
    Staff,
    UseParams
} from '@/_shared';

const _InvoiceItemForm = styled.div`
  .wraper-discount{
    display: flex;
    .discountValue{
      flex : 1;
    }
    .discount-amount,.discount-unit{
      &:focus {
        border-color: none;
        outline: 0;
        box-shadow:none;
      }
      height: 10vh;
      border: none;
      border-radius: 10px 0 0 10px;
      border: 1px solid rgb(239,239,239);
      font-weight: 700;
      font-size: 3.5vh;
    }
    .discount-unit{
      border: none;
      .ant-select-selector{
        height:calc( 10vh - 2px);
        border: none;
        border-radius: 0 10px 10px 0;
        display: flex;
        align-items: center;
        margin-top: 1px;
      }
    }
    .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border: none !important;
        box-shadow : none;
      }
    .discount-unit-form-item{
      width: 100px;
    }
  }
  .staff-slected{
    .ant-select-single .ant-select-selector .ant-select-selection-item, .ant-select-single .ant-select-selector .ant-select-selection-placeholder{
      line-height: auto;
    }
    .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border: none !important;
        box-shadow : none;
    }
    .ant-select-selector{
      height: 10vh ;
      border: none;
      border-radius:10px;
      display: flex;
      align-items: center;
      margin-top: 1px;
      font-weight: 700;
      font-size: 3vh;
    }
  }
  .wraper-form-button{
    display : flex;
    justify-content : space-around;
    .button{
      width: 9vw;
      height: 7vh;
      border: 0;
      font-size: 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      outline: 0;
      background: #00bedf;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .btnKeyboard{
    height: 20vh;
    font-size: 6vh;
    font-weight: 700;
  }
  .wraper-infomation{
    margin-top : 3vh;
    p {
      display: flex;
      justify-content:space-between;
      font-size: 2.5vh;
      font-weight: 700;
    }
    .into-price {
      border-top : 1px solid #333333;
      padding-top : 2vh ;
      font-size : 3.5vh;
    }
  }
`;

interface IInvoiceItemFormProps {
}

export const InvoiceItemForm = (props: React.PropsWithChildren<IInvoiceItemFormProps>) => {
  const { } = props;
  const [staffs, setStaffs] = React.useState<Staff[]>();

  const [form] = Form.useForm();

  const keyboard = React.useRef<KeyboardReact>();

  const history = useHistory();

  const [invoiceItemState] = useRecoilState(invoiceItem);

  const [listBookingState, setListBookingState] = useRecoilState(listBooking);

  const [data, setData] = React.useState({
    discountUnit: 'MONEY',
    discount: 0,
    ...invoiceItemState
  });

  const commonOptions = {
    layout: {
      default: [
        '1 2 3',
        '4 5 6',
        '7 8 9',
        '0 {bksp}'
      ]
    },
    buttonTheme: [{
      class: 'btnKeyboard',
      buttons: '1 2 3 4 5 6 7 8 9 0 - + = {bksp} q w e r t y u i o p {clear} a s d f g h j k l : {enter} z x c v b n m , . ? {shift} .com @ {space} |'
    }],
    theme: 'hg-theme-default hg-theme-numeric',
    mergeDisplay: true,
    display: {
      '{bksp}': 'Xóa'
    },
    syncInstanceInputs: true
  };

  React.useEffect(() => {
    axios.get(`${API_URL}/Staffs?order=id&orderType=DESC`, {
      headers: {
        authorization: `Bearer ${getStoredAccessToken()}`
      }
    }).then(e => {
      setStaffs(e.data.data as Staff[]);
    });
    if (invoiceItemState?.discountValue) {
      keyboard.current?.setInput(String(invoiceItemState?.discountValue));
    }
  }, []);

  const onFieldsChange = () => {
    const formValue = form.getFieldsValue() as typeof data;
    setData({
      ...invoiceItemState,
      ...data,
      ...formValue
    });
  };
  const { index } = useParams<UseParams>();
  const onSubmit = () => {
    const newListBookingState = [] as BookingItem[];
    const indexFormat = Number(index);

    listBookingState.map((e, index) => {
      if (indexFormat == index) {
        return newListBookingState.push({
          ...e,
          ...data,
          price: data.discountUnit === 'PERCENT' ? (data.rootPrice / 100 * (100 - data.discount)) : (data.rootPrice - data.discount)
        });
      }
      return newListBookingState.push({
        ...e
      });
    });

    setListBookingState(newListBookingState);

    return history.push('/casher');
  };
  return (
    <_InvoiceItemForm>
      <Row gutter={50}>
        <Col style={{
          display: 'flex',
          alignItems: 'center'
        }} span={12}>
          <Form
            onFieldsChange={onFieldsChange}
            onFinish={onSubmit}
            form={form}
            className='form'
            initialValues={
              {
                discountUnit: invoiceItemState?.discountUnit ? invoiceItemState.discountUnit : 'MONEY',
                discountValue: invoiceItemState?.discountValue && invoiceItemState.discountValue,
                staffId: invoiceItemState?.staffId
              }
            }
          >
            <div className='wraper-discount'>
              <Form.Item className='discountValue' name='discountValue'>
                <Input
                  type='number'
                  onChange={
                    () => {
                      keyboard.current?.setInput(form.getFieldValue('discountValue'));
                    }
                  }
                  onFocus={
                    () => {
                      keyboard.current?.setInput(form.getFieldValue('discountValue'));
                    }}
                  className='discount-amount'
                  placeholder="Giảm giá"
                />
              </Form.Item>
              <Form.Item className='discount-unit-form-item' name='discountUnit'>
                <Select className='discount-unit' >
                  <Select.Option
                    style={{
                      height: '10vh',
                      fontSize: '2.5vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 !important'
                    }}
                    value="PERCENT"
                  >
                    %
              </Select.Option>
                  <Select.Option
                    style={{
                      height: '10vh',
                      fontSize: '2.5vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 !important'
                    }}
                    value="MONEY"
                  >
                    đ
                </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='staff-slected' name='staffId'>
              <Select
                placeholder="Chọn nhân viên"
              >
                {staffs?.map(e => {
                  return (
                    <Select.Option
                      style={{
                        height: '10vh',
                        fontSize: '2.5vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 !important'
                      }}
                      key={e.id}
                      value={e.id}
                    >
                      {e.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <div className='wraper-form-button'>
              <Button className='button' htmlType='submit'>
                OK
            </Button>
              <Button onClick={() => {
                history.push('/casher');
              }} className='button' htmlType='submit'>
                Huỷ bỏ
            </Button>
            </div>
            <div className='wraper-infomation'>
              <p className='name-service'>
                {invoiceItemState?.name}
              </p>
              <p>
                Giá gốc:<span>{currency(invoiceItemState?.rootPrice)}</span>
              </p>
              <p className='discount-price'>
                Giảm giá:<span>{currency(data.discountUnit === 'PERCENT' ? (data.price / 100 * data.discount) : (data.discount))}</span>
              </p>
              <p className='into-price'>
                Thành tiền:<span>{currency(data.discountUnit === 'PERCENT' ? (data.rootPrice / 100 * (100 - data.discount)) : (data.rootPrice - data.discount))}</span>
              </p>
            </div>
          </Form>
        </Col>
        <Col span={12}>
          <Keyboard
            {...commonOptions}
            onChange={(e) => {
              form.setFieldsValue({
                discountValue: e
              });
              setData({
                ...data,
                discount: Number(form.getFieldValue('discountValue'))
              });
            }}
            keyboardRef={r => (keyboard.current = r)}
            onRender={() => {
              return;
            }}
          />
        </Col>
      </Row>
    </_InvoiceItemForm>
  );
};
