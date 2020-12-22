import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { InvoiceItemForm } from './InvoiceItemForm';

interface IInvoiceItemProps {

}
const _InvoiceItem = styled.div`
  padding-top: 10vh;
  padding-right: 20vw;
  padding-left: 20vw;
`;

export const InvoiceItem = (props: React.PropsWithChildren<IInvoiceItemProps>) => {
  const { } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_InvoiceItem>
      <InvoiceItemForm />
    </_InvoiceItem>
  );
};