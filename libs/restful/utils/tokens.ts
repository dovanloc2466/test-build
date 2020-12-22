import { deleteCookie, getCookie, setCookie } from 'libs/cookies';

export const saveAccessToken = (token: string, expires?: Date, remember?: boolean) => {
  if (remember) {
    setCookie(JTW_COOKIE_KEY, token, { expires });
  } else {
    sessionStorage.setItem(JTW_COOKIE_KEY, token);
  }
};

export const getStoredAccessToken = () => {
  const sessonToken = sessionStorage.getItem(JTW_COOKIE_KEY);
  if (sessonToken) {
    return sessonToken;
  }

  return getCookie(JTW_COOKIE_KEY);
};

export const removeStoreAccessToken = () => {
  sessionStorage.removeItem(JTW_COOKIE_KEY);
  deleteCookie(JTW_COOKIE_KEY);
};