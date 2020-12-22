let _i18n: (source: string) => string = (source) => source;

export const setI18n = (fn: typeof _i18n) => {
  _i18n = fn;
};

export const i18n: typeof _i18n = (source: string) => {
  return _i18n(source);
};