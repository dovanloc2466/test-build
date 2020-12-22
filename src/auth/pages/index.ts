/* eslint-disable @typescript-eslint/no-var-requires */

export const pages = [
  require('./login')['LoginPage'],
  require('./unauthorized')['PageUnauthorized'],

  require('./forbid')['PageForbid'],
];