export interface ITable<T, RP = {}> {
  readonly dataSource?: T;
  readonly loading: boolean;
  readonly reload: (params?: RP) => void;
}

export interface Service {
  id: number;
  maxCommission: number;
  name: string;
  price: number;
  salonBranchCreateId: number;
  salonId: number;
  serviceCategoryId: number;
  status: string;
  time: string;
  timeValue: string;
}

export interface ServiceCategory {
  created: string;
  createdBy: string;
  description: string;
  id: number;
  name: string;
  salonId: number;
  status: string;
  updated: string;
  updatedBy: string;
  service: Service[];
}

export interface Service {
  id: number;
  maxCommission: number;
  name: string;
  price: number;
  salonBranchCreateId: number;
  salonId: number;
  serviceCategoryId: number;
  status: string;
  time: string;
  timeValue: string;
}
export interface Product {
  createdBy: string;
  id: number;
  name: string;
  price: number;
  productCategoryId: number;
  status: string;
  updated: string;
  updatedBy: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  status: string;
  product: Product[];
}

export interface ServicePackedCategory {
  id: number;
  name: string;
  status: string;
  packages: ServicePacked[];
}

export interface ServicePacked {
  createdBy: string;
  id: number;
  name: string;
  price: number;
  packageCategoryId: number;
  status: string;
  updated: string;
  updatedBy: string;
}

export interface BookingItem {
  rootPrice: number;
  type: string;
  id: number;
  price: number;
  name: string;
  discountValue?: number;
  discountUnit?: string;
  staffId?: number;
}
export interface ApplicationUser {
  type: string;
  id: number;
  price: number;
  name: string;
  email: string;
  isAdmin: boolean;
  mobile?: string;
  salonId: number;
  status: string;
  salon: any;
  salonBranchCurrentId: number;
  salonBranchCurrent: any;
}

export interface Staff {
  id: number;
  name: string;
}

// export interface InvoiceItem {
//   type: string;
//   id: number;
//   price: number;
//   name: string;
//   discountAmout: number;
//   discountUnit: string;
// }

export interface UseParams {
  [key: string]: string;
}