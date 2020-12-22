import axios from 'axios';
import React from 'react';

import { ILoginFormValue, LoginForm } from './LoginForm';

interface ILoginFormControlProps {
  onSuccess: (response, request) => void
}

export const LoginFormControl = (props: React.PropsWithChildren<ILoginFormControlProps>) => {
  const { onSuccess } = props;

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(false);

  const submit = async (values: ILoginFormValue) => {
    try {
      await axios.post('https://secure.easysalon.vn/api/create-token', values)
        .then(e => {
          onSuccess(e, values);
        }).catch(() => {
          setError(true);
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      loading={loading}
      onSumbit={
        async (e) => {
          await submit(e);
        }
      }
      error={error}
    />
  );
};
