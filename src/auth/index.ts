import { IApplicationModule } from 'libs/framework/Types';

import { modulePath } from './configs';
import { pages } from './pages';

const module: IApplicationModule = {
  title: 'Auth',
  path: modulePath,
  defaultUrl: '/auth/login',
  pages: pages
};

export default module;