import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import shapeshift from 'shapeshift';
import has from 'lodash.has';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

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
    return rate;
  } catch (e) {
    throw e;
  }
}

app.get('/exchange-rate/:coinA/:coinB/:amount', async (req, res) => {
  const amount = req.params.amount;
  const coinA = req.params.coinA;
  const coinB = req.params.coinB;
  const isValidCoinType = await checkForCoinTypes([coinA, coinB]);
  if (isValidCoinType) {
    // get exchange rate..
    const pair = formatPair(coinA, coinB);
    try {
      const exchangeRate = await getExchangeRate(pair);
      res.status(200).json({ exchangeRate: exchangeRate });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(500).json({ error: 'coin type not found' });
  }
});

app.listen(PORT);

export default app;
