// @flow
// libs
import React from 'react'
import App from 'fusion-react'
import Helmet from 'fusion-plugin-react-helmet-async'
import SocketIO, { SocketIOConfigToken,SocketIOHandlersToken } from 'fusion-plugin-socket-io'

// src
import AppRoot from './App'
import socketHandlers from './socketHandlers'

export default () => {
  const app = new App(<AppRoot />)
  app.register(Helmet)
  app.register(SocketIO)
  app.register(SocketIOConfigToken, {port: 4400})

  if (__NODE__) {
    app.register(SocketIOHandlersToken, socketHandlers)
  }

  return app
}
