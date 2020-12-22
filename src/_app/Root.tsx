import {
    Application,
    ApplicationModule,
    ApplicationPart
} from 'libs/framework';
import { IApplicationRootProps } from 'libs/framework/Types';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { ApplicationUser } from '@/_shared';
import { DefaultLayout } from '@/_shared/layouts';
import { currentUserState } from '@/_shared/state';
import Authentication from '@/auth';
import Dashboard from '@/dashboard';

export interface IRootProps extends IApplicationRootProps {
  readonly user: ApplicationUser | null;
}

export const Root = (props: IRootProps) => {
  const [, setCurrentUser] = useRecoilState(currentUserState);

  React.useEffect(
    () => {
      setCurrentUser(props.user);
    },
    []
  );

  return (
    <Application>
      <ApplicationPart
        path="/auth"
      >
        <ApplicationModule module={Authentication} />
      </ApplicationPart>
      <ApplicationPart
        path="/"
        layout={DefaultLayout}
      >
        <ApplicationModule module={Dashboard} />
      </ApplicationPart>
    </Application>
  );
};