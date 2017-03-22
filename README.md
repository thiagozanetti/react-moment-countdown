# react-moment-countdown
An unopinionated countdown component for React using moment.js.


### Installation

```js
$ npm install react-moment-countdown --save
```

### How to use

```js
import React from 'react';
import ReactMomentCountDown from 'react-moment-countdown';

const CountDownComponent = (props) => {
  const dateInFuture = new Date('2017-12-31');

  return(
    <ReactMomentCountDown toDate={ dateInFuture }>
  );
};
```
