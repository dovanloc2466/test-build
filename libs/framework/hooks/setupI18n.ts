import { createTranslatior, CreateTranslatiorProps, setI18n } from '../i18n';

export const setupI18n = (i18nResource: CreateTranslatiorProps) => {
  const _i18n = createTranslatior(i18nResource);

  setI18n(_i18n);
}