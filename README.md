# react-countdown-timer
An unopinionated countdown timer component for React using moment.js.


### Installation

```js
$ npm install react-countdown-timer --save
```

### How to use

```js
import React from 'react';
import ReactCountDownTimer from 'react-countdown-timer';

const CountDownComponent = (props) => {
  const dateInFuture = new Date('2017-12-31');

  return(
    <ReactCountDownTimer toDate={ dateInFuture }>
  );
};
```
