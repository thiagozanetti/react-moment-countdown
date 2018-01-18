# react-moment-countdown
An unopinionated countdown component for React using moment.js.


## Installation

```js
$ npm install react-moment-countdown --save
```

## How to use

### Insert javascript `Date` instance into `toDate` props:

   ```js
      import React from 'react';
      import ReactMomentCountDown from 'react-moment-countdown';

      export default function CountDownComponent () {
        const dateInFuture = new Date('2017-12-31');

        return (
          <ReactMomentCountDown toDate={dateInFuture} />
        );
      };
   ```

### Insert `moment` instance into `toDate` props:

   ```js
   import React from 'react';
   import ReactMomentCountDown from 'react-moment-countdown';
   import moment from 'moment';

   export default function CountDownComponent () {
     const dateInFuture = moment('2017-12-31', 'YYYY-MM-DD');

     return (
       <ReactMomentCountDown toDate={dateInFuture} />
     );
   };
   ```

### Insert string value into `toDate` props with additional `sourceFormatMask` props:

The default value of `sourceFormatMask` props is `YYYY-MM-DD`.

   ```js
   import {render} from 'react-dom'
   import ReactMomentCountDown from 'react-moment-countdown'

   render(
     <ReactMomentCountDown toDate='2017-12-31 23:59:59' sourceFormatMask='YYYY-MM-DD HH:mm:ss' />,
     document.getElementById('sample-date')
   )
   ```   

## Customize

### `targetFormatMask` props

   You can customize countdown format display with `targetFormatMask` props (default is `'HH:mm:ss'`), for example  

   ```js
   import {render} from 'react-dom'
   import ReactMomentCountDown from 'react-moment-countdown'
   import moment from 'moment'

   const sampleDate = moment('2017-12-31')

   render(
     <ReactMomentCountDown toDate={sampleDate} targetFormatMask='DD:HH:mm:ss' />,
     document.getElementById('sample-date')
   )
   ```
### `onTick` and `onCountdownEnd` props

  You can add `onTick` function to trigger actions for every `tick` and `onCountdownEnd` to trigger actions when countdown timer has ended

  ```js
  import React, {PureComponent} from 'react'
  import ReactMomentCountDown from 'react-moment-countdown'
  import moment from 'moment'

  export default class SampleClass extends PureComponent {
    constructor (props) {
      super(props)
      this.state = { endCountdown: false }
      this.sampleOnTick = this.sampleOnTick.bind(this)
      this.sampleOnCountdownEnd = this.sampleOnCountdownEnd.bind(this)
    }
    sampleOnTick (countdown) {
      this.setState({ endCountdown: countdown <= 0 })
    }
    sampleOnCountdownEnd () {
      console.log('Happy Birthday to you :)')
    }
    render () {
      const dateInFuture = moment('2017-12-31', 'YYYY-MM-DD');
      return (
        <ReactMomentCountDown toDate={dateInFuture}
          onTick={this.sampleOnTick}
          onCountdownEnd={this.sampleOnCountdownEnd} />
      )
    }
  }
  ```
