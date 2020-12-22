import { atom } from 'recoil';

import { ApplicationUser } from '../Types';
import { BookingItem } from '../Types';

export const currentUserState = atom<ApplicationUser | null>({
  key: 'userState',
  default: null,
});

export const listBooking = atom<BookingItem[]>({
  key: 'listBookingState',
  default: [],
});

export const invoiceItem = atom<BookingItem | null>({
  key: 'invoiceItemState',
  default: null,
});
