import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import gist from 'react-syntax-highlighter/dist/esm/styles/hljs/github-gist';

import ReactMomentCountDown from 'react-moment-countdown';

import './index.css';
import * as serviceWorker from './serviceWorker';

SyntaxHighlighter.registerLanguage('javascript', javascript);

const exampleConfig = toDate => `
import React from 'react';
import ReactMomentCountDown from 'react-moment-countdown';
import moment from 'moment';

export default function CountDownComponent () {
  const dateInFuture = moment('${toDate}', 'YYYY-MM-DD');

  return (
    <ReactMomentCountDown toDate={dateInFuture} />
  );
};
`;

const dateInFuture = moment(moment().add(1, 'minute'), 'YYYY-MM-DD');

const CountDownComponent = () => {
  const handleTick = (delta) => {
    console.log(delta);
  }

  const handleCountdownEnd = () => {
    console.log('Countdown has ended!');
  }

  return (
    <div>
      <span>Countdown ends in:</span>
      <ReactMomentCountDown
        toDate={dateInFuture}
        onTick={handleTick}
        onCountdownEnd={handleCountdownEnd}
      />
    </div>
  );
}

ReactDOM.render(
  <div>
    <h1>
      react-moment-countdown example
    </h1>
    <p>Using this configuration:</p>
    <SyntaxHighlighter language='javascript' style={gist}>{exampleConfig(dateInFuture)}</SyntaxHighlighter>
    <p>This is the returned value:</p>
    <CountDownComponent />
  </div>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
