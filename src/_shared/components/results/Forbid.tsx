import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

interface IForbidProps {
  readonly backUrl?: string;
}

export const Forbid = (props: React.PropsWithChildren<IForbidProps>) => {
  const {
    backUrl = '/'
  } = props;

  const history = useHistory();

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <Result
      status="403"
      title="401"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button onClick={() => history.push(backUrl)}  type="primary">Back home</Button>}
    />
  );
};