// @flow
import React from 'react'
import { assetUrl } from 'fusion-core'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { withSocket } from 'fusion-plugin-socket-io'

class App extends React.Component {
  state = { value: '', messages: [] }

  componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message) {
      this.setState(({ messages }) => ({
        messages: [nextProps.message, ...messages],
      }))
    }
  }

  handleChangeText = event => {
    event.preventDefault()
    event.persist()
    this.setState(() => ({ value: event.target.value + '' }))
  }

  handleClick = e => {
    event.preventDefault()
    const { value } = this.state
    if (value) {
      this.props.chat(value)
      this.setState(() => ({ value: '' }))
    }
  }

  render() {
    const { value, messages } = this.state
    const { socketClient } = this.props

    return (
      <div className="root">
        <Helmet>
          <link rel="stylesheet" href={assetUrl('./App.css')} />
        </Helmet>
        <div className="messages">
          {messages.map(({ sentBy, data: text }, index) => (
            <div
              key={`${sentBy}-${index}`}
              className={[
                'message',
                socketClient && socketClient.id === sentBy && 'myMessage',
              ].join(' ')}
            >
              {text}
            </div>
          ))}
        </div>
        <form className="inputArea" onSubmit={this.handleClick}>
          <input autoFocus value={value} onChange={this.handleChangeText} />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default withSocket({
  emitter: 'chat',
  listener: 'message',
})(App)
