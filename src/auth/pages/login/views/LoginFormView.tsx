import JwtDecode from 'jwt-decode';
import { DecodedJWT, redirect } from 'libs/framework';
import { saveAccessToken } from 'libs/restful';
import * as moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AuthFormCard } from '@/auth/components';
import { LoginFormControl } from '@/auth/forms/login';

const _LoginFormView = styled.div`
  min-width: 340px;
  margin-top: 40px;
`;

interface ILoginFormViewProps {

}

export const LoginFormView = (props: React.PropsWithChildren<ILoginFormViewProps>) => {
  const { } = props;

  const history = useHistory();

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_LoginFormView>
      <AuthFormCard title="LOGIN">
        <LoginFormControl
          onSuccess={(response, request) => {
            const expires = moment().add(999, 'hour').toDate();
            saveAccessToken(
              response.data.token!,
              expires,
              true
            );
            redirect('/');
          }}
        />
      </AuthFormCard>
    </_LoginFormView>
  );
};