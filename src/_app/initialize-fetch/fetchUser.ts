import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getStoredAccessToken } from 'libs/restful';

import { ApplicationUser } from '../../_shared/Types';

interface TokenObj {
  aud: string;
  emailAddress: string;
  exp: number;
  isAdminUser: string;
  iss: string;
  name: string;
  role: string;
  salonId: string;
  sub: string;
  userId: string;
}

export const fetchUser = async () => {
  const existingToken = getStoredAccessToken();
  if (!existingToken) {
    return null;
  }

  try {
    jwt_decode(existingToken);
  } catch (error) {
    return null;
  }

  const e = jwt_decode(existingToken) as TokenObj;

  let user;

  await axios.get(`https://api.easysalon.vn/Users/${e.userId}`, {
    headers: {
      authorization: `Bearer ${existingToken}`
    }
  }).then(e => {
    user = e.data.data;
  }).catch(() => {
    user = null;
  });

  return user;
};