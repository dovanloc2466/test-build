import { i18n } from 'libs/framework';
import { IApplicationModule } from 'libs/framework/Types';

import { pages } from './pages';

interface IDashboardModule extends IApplicationModule {

}

const module: IDashboardModule = {
  title: i18n('Dashboard'),
  path: '/',
  defaultUrl: '/',
  pages: pages,
};

export default module;