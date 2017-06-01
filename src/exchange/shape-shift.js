import shapeshift from 'shapeshift';
import has from 'lodash.has';

const formatPair = (a, b) => `${a}_${b}`;

async function checkForCoinTypes(types) {
  try {
    const [coinA, coinB] = types;
    const { body } = await shapeshift.getCoins();
    return has(body, coinA) && has(body, coinB);
  } catch (e) {
    throw e;
  }
}

async function getExchangeRate(pair) {
  try {
    const { body: { rate } } = await shapeshift.getRate(pair);
    return +rate;
  } catch (e) {
    throw e;
  }
}

export default async function getShapeShiftExchangeRate(coinTypes) {
  const [coinA, coinB] = coinTypes;
  const isValidCoinType = await checkForCoinTypes([coinA, coinB]);
  if (isValidCoinType) {
    const pair = formatPair(coinA, coinB);
    const exchangeRate = await getExchangeRate(pair);
    return exchangeRate;
  } else {
    return { error: 'coin type not found' };
  }
};