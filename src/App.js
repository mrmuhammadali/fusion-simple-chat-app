// @flow
import React, {useEffect, useState} from 'react'
import { assetUrl } from 'fusion-core'
import { Helmet } from 'fusion-plugin-react-helmet-async'
import { withSocket } from 'fusion-plugin-socket-io'

function App(props) {
  const { chat, message, socketClient } = props
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (message.data) {
      setMessages([message, ...messages])
    }
  }, [message])

  function handleTextChange(event) {
    event.preventDefault()
    event.persist()
    setValue(event.target.value + '' )
  }

  function handleClick(event) {
    event.preventDefault()
    if (value) {
      chat(value)
      setValue('')
    }
  }

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
      <form className="inputArea" onSubmit={handleClick}>
        <input autoFocus value={value} onChange={handleTextChange} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default withSocket({
  emitter: 'chat',
  listener: 'message',
})(App)
