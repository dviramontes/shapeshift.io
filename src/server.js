import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { preferredCoinTypes, defaultCoinType } from './constants';
import getShapeShiftExchangeRate from './exchange/shape-shift';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get('/best-exchange-rate/:amount', async (req, res) => {
  const { amount } = req.params;
  if (amount) {
    const types = preferredCoinTypes;
    const eth = await getShapeShiftExchangeRate([defaultCoinType, types.get('ethereum')]);
    const ltc = await getShapeShiftExchangeRate([defaultCoinType, types.get('litecoin')]);
    const dash = await getShapeShiftExchangeRate([defaultCoinType, types.get('dash')]);
    res.status(200).json({
      best: null,
      shapeShift: {
        eth,
        ltc,
        dash,
      },
    });
  } else {
    res.status(500).json({ error: 'must pass amount as url param' });
  }
});

app.listen(PORT);

export default app;
