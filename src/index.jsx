import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {momentObj} from 'react-moment-proptypes'

import formatDate from './format-date'

class ReactMomentCountDown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      countdown: null
    }
  }

  componentDidMount () {
    this.tick()

    this.timer = window.setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  tick = () => {
    const {toDate, sourceFormatMask, targetFormatMask, onCountdownEnd, onTick} = this.props
    const [delta, countdown] = formatDate(toDate, targetFormatMask, sourceFormatMask)

    if (delta <= 0) {
      window.clearInterval(this.timer)

      if (onCountdownEnd) {
        onCountdownEnd()
      }
    }

    this.setState({
      countdown
    })

    if (onTick) {
      onTick(delta)
    }
  }

  render () {
    return (
      <span>{ this.state.countdown }</span>
    )
  }
};

ReactMomentCountDown.propTypes = {
  toDate: PropTypes.oneOfType([
    momentObj,
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]).isRequired,
  sourceFormatMask: PropTypes.string,
  targetFormatMask: PropTypes.string,
  onTick: PropTypes.func,
  onCountdownEnd: PropTypes.func
}

ReactMomentCountDown.defaultProps = {
  sourceFormatMask: 'YYYY-MM-DD',
  targetFormatMask: 'HH:mm:ss',
  onTick: null,
  onCountdownEnd: null
}

export default ReactMomentCountDown
