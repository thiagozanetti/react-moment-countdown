import React, { Component } from 'react';

import formatDate from './format-date';

class ReactIntlCountDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countdown: null,
    }
  }

  componentDidMount() {
    this.tick();

    this. timer = window.setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick = () => {
    const countdown = formatDate(new Date(), this.props.toDate, this.props.formatMask);

    if (countdown === '00:00:00') {
      window.clearInterval(this.timer);

      if (this.props.onCountdownEnd) {
        this.props.onCountdownEnd();
      }
    }

    this.setState({
      countdown,
    });

    if (this.props.onTick) {
      this.props.onTick(countdown);
    }
  }

  render() {
    return(
      <span>{ this.state.countdown }</span>
    );
  }
};

ReactIntlCountDown.propTypes = {
  toDate:React.PropTypes.instanceOf(Date).isRequired,
  formatMask: React.PropTypes.string.isRequired,
  onTick: React.PropTypes.func,
  onCountdownEnd: React.PropTypes.func,
};

ReactIntlCountDown.defaultProps = {
  formatMask: 'HH:mm:ss',
  onTick: null,
  onCountdownEnd: null,
};

export default ReactIntlCountDown;
