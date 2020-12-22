import { ApiException } from '../_gen';

export const isEntryNotFound = (error?: ApiException) => {
  return error?.response === '"ENTRY_NOT_FOUND"';
};