import * as C from './consts'
import io from 'socket.io-client'

let headers = new Headers({
  'content-type': 'application/json;charset=utf-8'
})

export default {
  add (ctx, name) {
    if (name === '') {
      return
    }
    return fetch('/api/list', {
      method: 'POST',
      body: JSON.stringify({name}),
      headers
    })
  },
  remove (ctx, id) {
    return fetch('/api/list', {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers
    })
  },
  update ({commit}) {
    return fetch('/api/list')
      .then(res => res.json())
      .then(data => commit(C.UPDATE, data))
  },
  run (ctx, id) {
    return fetch('/api/list/run/' + id, {
      method: 'POST',
      headers
    })
  },
  io ({commit}) {
    var socket = io()
    socket.on('add', data => commit(C.ADD, data))
    socket.on('remove', id => commit(C.REMOVE, id))
    socket.on('update', data => commit(C.UPDATE, data))
  }
}
