export * from './Types';
export * from './utils';
export * from './components';
export * from './configs';
export * from './domain';
export * from './state';

import i18nResources from './i18nResources.json';
import allPermissions from './permissions.json';

const permissions = allPermissions;

export {
  permissions,
  i18nResources
};