import {Component} from 'react'

const initialState = {
  isTimeRunning: false,
  timeinSeconds: 0,
  timeinMiinutes: 25,
}

class DigitalTimer extends Component {
  initialState = this.state

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitMinutes = () => {
    const {timeinMiinutes} = this.state

    if (timeinMiinutes > 1) {
      this.setState(prevState => ({
        timeinMiinutes: prevState.timeinMiinutes - 1,
      }))
    }
  }

  onInceaseTimerLimitMinutes = () => {
    this.setState(prevState => ({
      timeinMiinutes: prevState.timeinMiinutes + 1,
    }))
  }

  renderTimerLimitContrller = () => {
    const {timeinMiinutes, timeinSeconds} = this.state
    const isButtonDisabled = timeinSeconds > 0

    return (
      <div>
        <p>Set Timer Limit</p>
        <div>
          <button
            type="button"
            onClick={this.onDecreaseTimerLimitMinutes}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div>
            <p>{timeinMiinutes}</p>
          </div>
          <button
            type="button"
            onClick={this.onInceaseTimerLimitMinutes}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onresetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onInceaseTimerLimitSeconds = () => {
    const {timeinMiinutes, timeinSeconds} = this.state
    const isTimeCompleted = timeinSeconds === timeinMiinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeinSeconds: prevState.timeinSeconds + 1,
      }))
    }
  }

  onStartorPausetimer = () => {
    const {timeinMiinutes, timeinSeconds, isTimeRunning} = this.state
    const isTimeCompleted = timeinSeconds === timeinMiinutes * 60

    if (isTimeCompleted) {
      this.setState({timeinSeconds: 0})
    }
    if (isTimeRunning) {
      this.intervalId = setInterval(this.onInceaseTimerLimitSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    const imageurl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startorpauseText = isTimeRunning ? 'pause icon' : ' play icon'

    return (
      <div>
        <button type="button" onClick={this.onStartorPausetimer}>
          <img src={imageurl} alt={startorpauseText} />
          <p>{isTimeRunning ? 'pause icon' : ' play icon'}</p>
        </button>
        <button type="button" onClick={this.onresetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  getTimeFromat = () => {
    const {timeinMiinutes, timeinSeconds} = this.state
    const remainingMinutes = timeinMiinutes * 60 - timeinSeconds
    const minute = Math.floor(remainingMinutes / 60)
    const seconds = Math.floor(remainingMinutes % 60)
    const stringMinutes = minute > 9 ? minute : `0${minute}`
    const stringSeonds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeonds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const lateltext = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <h1>{this.getTimeFromat}</h1>
          <p>{lateltext}</p>
        </div>
        <div>
          {this.renderTimeController()}
          {this.renderTimerLimitContrller()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
