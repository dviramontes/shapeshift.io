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

async function checkForCoinType(type) {
  try {
    const { body } = await shapeshift.getCoins();
    return has(body, type);
  } catch (e) {
    throw e;
  }
}

app.get('/exchange-rate/:coin/:amount', async (req, res) => {
  const amount = req.params.amount;
  const coin = req.params.coin;
  const isValidCoinType = await checkForCoinType(coin);
  if (isValidCoinType) {
    // get exchange rate..
    res.send(200).json({});
  } else {
    res.status(500).json({ 'error': 'coin type not found' });
  }
});

app.listen(PORT);

export default app;
