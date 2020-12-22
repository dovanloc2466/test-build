import { Col, notification, Row } from 'antd';
import axios from 'axios';
import { getStoredAccessToken } from 'libs/restful';
import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
    BookingItem,
    currentCustomerState,
    currentUserState,
    listBooking,
    Product,
    ProductCategory,
    Service,
    ServiceCategory,
    ServicePacked,
    ServicePackedCategory
} from '@/_shared';
import { PrintOrder } from '@/_shared/model';
import { Services } from '@/_shared/model/Services';

import { IDefaultViewProps, PrintOrderView } from '../../print-order/views';
import { CashierControl } from './CashierControl';
import { Invoice } from './Invoice';
import { OrderProduct, OrderService, OrderServicePacked } from './order';

const _Casher = styled.div`
  min-height :100vh;
  flex-direction: column;
  display: flex;
  .mainContent{
    margin-top: 20px;
    flex : 1;
    .ant-tabs-nav{
      height: calc(100vh - 105px);
      overflow-y: scroll;
      overflow-x:hidden;
    }
    .ant-tabs-content-holder{
      height: calc(100vh - 105px);
      overflow-y: scroll;
      overflow-x:hidden;
    }
  }
`;

interface ICasherProps {
}

interface DataService {
  service?: ServiceCategory[];
  category: 'service' | 'product' | 'service package';
}

interface DataProduct {
  products?: Product[];
  category: 'service' | 'product' | 'service package';
  productcategorys: ProductCategory[];
}

interface DataServicePacked {
  servicePackeds?: ServicePacked[];
  category: 'service' | 'product' | 'service package';
  servicePackedCategorys: ServicePackedCategory[];
}

interface InvoiceInterface {
  [key: string]: number | string | undefined;
}
interface PosDataInvoice {
  customerId?: number;
  posInvoiceItems: InvoiceInterface[];
}

export const Casher = (props: React.PropsWithChildren<ICasherProps>) => {
  const { } = props;

  const [orderCate, setOrderCate] = React.useState<string>('service');

  const [dataService, setDataService] = React.useState<DataService>();

  const [dataProduct, setDataProduct] = React.useState<DataProduct>();

  const [dataServicePacked, setDataServicePacked] = React.useState<DataServicePacked>();

  const [listBookingState, setListBookingState] = useRecoilState<BookingItem[]>(listBooking);

  const [dataBooking, setDataBooking] = React.useState<BookingItem[]>(listBookingState);

  const [services, setServices] = React.useState<IDefaultViewProps>();

  const [currentCustomer, SetCurrentCustomer] = useRecoilState(currentCustomerState);

  const [currentUser] = useRecoilState(currentUserState);

  const history = useHistory();

  const onSubmit = () => {
    const posDataInvoice = {} as PosDataInvoice;
    posDataInvoice.customerId = currentCustomer?.id;
    posDataInvoice.posInvoiceItems = [];
    listBookingState.map(e => {
      if (e.type === 'service') {
        return posDataInvoice.posInvoiceItems.push({
          serviceId: e.id,
          quantity: 1,
          discountValue: e.discountValue,
          discountUnit: e.discountUnit,
          staffId: e.staffId
        });
      }
      if (e.type === 'product') {
        return posDataInvoice.posInvoiceItems.push({
          productId: e.id,
          quantity: 1,
          discountValue: e.discountValue,
          discountUnit: e.discountUnit,
          staffId: e.staffId
        });
      }
      if (e.type === 'service package') {
        return posDataInvoice.posInvoiceItems.push({
          packageId: e.id,
          quantity: 1,
          discountValue: e.discountValue,
          discountUnit: e.discountUnit,
          staffId: e.staffId
        });
      }
    });

    axios.post(
      `${API_URL}/PosInvoices`,
      posDataInvoice,
      {
        headers: {
          authorization: `Bearer ${getStoredAccessToken()}`
        }
      }
    ).then((e) => {
      notification.success({
        message: 'Success',
        description: 'Thực hiện Order thành công',
        style: {
          width: 500,
        }, duration: 1
      });
      setDataBooking([]);
      SetCurrentCustomer(null);

      const servicesData = [] as Services[];

      e.data.posInvoiceItems.map(invoiceItem => {
        const service = {} as Services;
        service.price = invoiceItem.invoiceDetail.total;

        if (invoiceItem.service?.name) {
          service.name = invoiceItem.service.name;
          service.id = invoiceItem.service.id;
        }

        if (invoiceItem.package?.name) {
          service.name = invoiceItem.package.name;
          service.id = invoiceItem.package.id;
        }

        if (invoiceItem.product?.name) {
          service.name = invoiceItem.product.name;
          service.id = invoiceItem.product.id;
        }

        if (service.name) {
          servicesData.push(service);
        }
      });

      setServices({
        print: {
          address: currentUser?.salonBranchCurrent?.address,
          curator: currentCustomer?.name,
          date: e.data.created,
          phone: currentUser?.salon.mobile,
          name: currentUser?.salon.name
        } as PrintOrder,
        service: servicesData
      });
      setTimeout(function () {
        history.push('/');
      }, 1000);
    }).catch(() => {
      notification.error({
        message: 'Error',
        description:
          'Thực hiện thất bại, vui lòng kiểm tra lại'
      });
    });
  };

  React.useEffect(
    () => {
      setListBookingState([
        ...dataBooking
      ]);
    },
    [dataBooking]
  );

  React.useEffect(
    () => {
      if (orderCate == 'service') {
        axios.get(
          `${API_URL}/ServiceCategorys?orderBy=name&orderType=asc`,
          {
            headers: {
              authorization: `Bearer ${getStoredAccessToken()}`
            }
          }
        ).then(e => {
          setDataService({
            category: orderCate,
            service: e.data.data
          } as DataService);
        });
      }

      if (orderCate == 'product') {
        axios.get(
          `${API_URL}/Warehouses?rowPerPage=1000&order=id&orderType=DESC`,
          {
            headers: {
              authorization: `Bearer ${getStoredAccessToken()}`
            }
          }
        ).then(e => {
          const products = [] as Product[];
          e.data.data.map(e => {
            products.push(e.product);
          });
          axios.get(
            `${API_URL}/ProductCategorys?orderBy=name&orderType=asc`,
            {
              headers: {
                authorization: `Bearer ${getStoredAccessToken()}`
              }
            }
          ).then(e => {
            const productCategorys = [] as ProductCategory[];
            e.data.data.map(e => {
              productCategorys.push(e);
            });
            setDataProduct({
              products: products,
              productcategorys: productCategorys,
              category: 'product'
            } as DataProduct);
          });
        });
      }

      if (orderCate == 'service package') {
        axios.get(
          `${API_URL}/PackageCategories?orderBy=name&orderType=asc`,
          {
            headers: {
              authorization: `Bearer ${getStoredAccessToken()}`
            }
          }
        ).then(servicePackedCategory => {
          axios.get(
            `${API_URL}/packages?rowPerPage=500&order=id&orderType=DESC`,
            {
              headers: {
                authorization: `Bearer ${getStoredAccessToken()}`
              }
            }
          ).then(servicePacked => {
            setDataServicePacked({
              servicePackedCategorys: servicePackedCategory.data.data as ServicePackedCategory[],
              servicePackeds: servicePacked.data.data as ServicePacked[],
              category: 'service package'
            });
          });
        });
      }
    },
    [orderCate]
  );

  return (
    <_Casher>
      <CashierControl changeTab={
        (e) => {
          setOrderCate(e);
        }
      }
      />
      <Row className='mainContent no-print'>
        <Col span={18}>
          {orderCate === 'service' && (
            <OrderService
              selectService={(e: Service) => {
                setDataBooking(
                  [...dataBooking, {
                    rootPrice: e.price,
                    id: e.id,
                    type: 'service',
                    name: e.name,
                    price: e.price,
                  }]
                );
              }}
              category={dataService?.category}
              service={dataService?.service}
            />
          )}
          {orderCate === 'product' && (
            <OrderProduct
              selectProduct={
                (e: Product) => {
                  setDataBooking(
                    [...dataBooking, {
                      rootPrice: e.price,
                      id: e.id,
                      type: 'product',
                      name: e.name,
                      price: e.price,
                    }]
                  );
                }
              }
              productCategorys={dataProduct?.productcategorys}
              products={dataProduct?.products}
              category={dataProduct?.category}
            />
          )}
          {orderCate === 'service package' && (
            <OrderServicePacked
              selectServicePacked={
                (e: ServicePacked) => {
                  setDataBooking(
                    [...dataBooking, {
                      rootPrice: e.price,
                      id: e.id,
                      type: 'service package',
                      name: e.name,
                      price: e.price,
                    }]
                  );
                }
              }
              servicePackedCategorys={dataServicePacked?.servicePackedCategorys}
              servicePackeds={dataServicePacked?.servicePackeds}
              category={dataServicePacked?.category}
            />
          )}
        </Col>
        <Col

          span={6}>
          <Invoice
            submit={onSubmit}
            onDelete={
              (e) => {
                const newDataBooking = [...dataBooking];
                const index = newDataBooking.findIndex(v => v.id === e.id && v.type === e.type);
                newDataBooking.splice(index, 1);
                setDataBooking([
                  ...newDataBooking
                ]);
              }}
            invoiceItems={dataBooking}
          />
        </Col>
      </Row>
      <PrintOrderView print={services?.print} service={services?.service} />
    </_Casher >
  );
};
