import { map } from 'lodash';

import { getCurrentLang } from './getCurrentLang';
import { normalizeResources } from './normalizeResources';
import { setCurrentLang } from './setCurrentLang';

export interface I18nResource {
  readonly [langkey: string]: { [key: string]: string };
}

export interface CreateTranslatiorProps {
  readonly resources: I18nResource;
  readonly defaultLangue: string;
}

export const createTranslatior = ({
  resources,
  defaultLangue
}: CreateTranslatiorProps) => {
  let currentLang = getCurrentLang();

  if (!currentLang) {
    setCurrentLang(defaultLangue);
    return createTranslatior({ resources, defaultLangue })
  }

  const _resources = normalizeResources(resources);

  return (source: string) => {
    if (!currentLang || !source) {
      return source;
    }

    if (_resources[currentLang]) {
      let dest = _resources[currentLang][source.toLowerCase()];
      return dest ?? source;
    }

    return source;
  };
};