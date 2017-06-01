# shapeshift.com code-exercise

---

## Endpoints:

### Look up exchange rate for given coin-type:
#### GET `/best-exchange-rate`
#### Sample Response: 
```
{
  "best-by-coin-type": {
    "eth": "shapeshift.io",
    "ltc": "btc-e.com",
    "dash": "btc-e.com"
  },
  "shapeShift": {
    "eth": 10.89633759,
    "ltc": 87.82237479,
    "dash": 17.11876329
  },
  "btc-e": {
    "eth": 10.870342102082224,
    "ltc": 88.25009531071294,
    "dash": 17.166663922729548
  }
}
```

---

## Requirements:

- Node v7 or newer

	`nvm install v7`
	
	`nvm use v7`

## Setup:

`npm install`

## Running:

`npm start`

Server runs on **localhost:4000**

## Development:

`npm run dev`

## Building Production Bundle:

`npm run build`
