import * as ws from 'ws'
import {
  SOCKET_INIT,
  SOCKET_SEND,
  SOCKET_RECEIVE
} from './socket-action-types'
import { Action } from '../../../core'

export function socketInit (id: String, connection: ws): Action {
  return {
    type: SOCKET_INIT,
    id,
    connection,
    timeMs: new Date().getTime()
  }
}

export function socketSend (id: String): Action {
  return {
    type: SOCKET_SEND,
    id,
    timeMs: new Date().getTime()
  }
}

export function socketReceive (id: String): Action {
  return {
    type: SOCKET_RECEIVE,
    id,
    timeMs: new Date().getTime()
  }
}