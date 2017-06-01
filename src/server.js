import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { preferredCoinTypes, defaultCoinType } from './constants';
import getShapeShiftExchangeRate from './exchange/shape-shift';
import getBTCExchangeRate from './exchange/BTC-E';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get('/best-exchange-rate', async (req, res) => {

  const types = preferredCoinTypes;
  // SHAPESHIFT.IO
  const eth = await getShapeShiftExchangeRate([defaultCoinType, types.get('ethereum')]);
  const ltc = await getShapeShiftExchangeRate([defaultCoinType, types.get('litecoin')]);
  const dash = await getShapeShiftExchangeRate([defaultCoinType, types.get('dash')]);
  // BTC-E.COM
  const eth_btce = await getBTCExchangeRate([defaultCoinType, types.get('ethereum')]);
  const ltc_btce = await getBTCExchangeRate([defaultCoinType, types.get('litecoin')]);
  const dash_btce = await getBTCExchangeRate([defaultCoinType, types.get('dsh')]);

  const compareRate = (a, b) => a > b ? 'shapeshift.io' : 'btc-e.com';

  res.status(200).json({
    'best-by-coin-type': {
      eth: compareRate(eth, eth_btce),
      ltc: compareRate(ltc, ltc_btce),
      dash: compareRate(dash, dash_btce),
    },
    shapeShift: {
      eth,
      ltc,
      dash,
    },
    'btc-e': {
      eth: eth_btce,
      ltc: ltc_btce,
      dash: dash_btce,
    },
  });
});

app.listen(PORT);

export default app;
