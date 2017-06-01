// list of preferred exchange rates
// ***

const preferredCoinTypes = new Map([
  ['ethereum', 'ETH'],
  ['litecoin', 'LTC'],
  ['dash', 'DASH'],
  ['dsh', 'DSH'], // for btc-e.com
]);

const defaultCoinType = 'BTC';

export {
  preferredCoinTypes,
  defaultCoinType,
};
