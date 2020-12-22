/* eslint-disable @typescript-eslint/no-var-requires */

export const pages = [
  require('./print-order')['PagePrintOrder'],
  
  require('./cashier')['PageCashier'],

  require('./invoice-item')['PageInvoiceItem'],

  require('./customer')['PageCustomer']
];