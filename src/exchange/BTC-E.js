import request from 'request-promise';

// Note: assumes USD
const formatPair = (a, b) => `${a}_usd-${b}_usd`;

export default async function getBTCExchangeRate(coinTypes) {

  const [coinA, coinB] = coinTypes.map(c => c.toLowerCase());
  const pair = formatPair(coinA, coinB);
  const url = `https://btc-e.com/api/3/ticker/${pair}`;

  const opts = {
    url,
    json: true,
    method: 'GET',
  };

  try {
    const data = await request(opts);
    // calculate exchange rate and return it
    const [a, b] = Object.keys(data);
    const { sell } = data[a];
    const { buy } = data[b];
    return sell / buy;
  } catch (e) {
    throw e;
  }
}