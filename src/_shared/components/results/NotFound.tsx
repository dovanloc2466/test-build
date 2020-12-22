import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

interface INotFoundProps {
  readonly backUrl?: string;
}

export const NotFound = (props: React.PropsWithChildren<INotFoundProps>) => {
  const {
    backUrl = '/'
  } = props;

  const history = useHistory();

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => history.push(backUrl)}  type="primary">Back Home</Button>}
    />
  );
};