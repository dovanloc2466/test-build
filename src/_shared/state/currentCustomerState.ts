
export interface ICustomer {
  id: number;
  status: string;
  mobile: string;
  name: string;
  salonBranchId: number;
  salonId: number;
  code: string;
  refByCustomerId: number;
}
import { atom } from 'recoil';

export const currentCustomerState = atom<ICustomer | null>({
  key: 'customerState',
  default: null,
});