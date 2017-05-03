import * as C from './consts'

let headers = new Headers({
  'content-type': 'application/json;charset=utf-8'
})

export default {
  add ({commit}, name) {
    if (name === '') {
      return
    }
    return fetch('/api/list', {
      method: 'POST',
      body: JSON.stringify({name}),
      headers
    })
      .then(res => res.json())
      .then(data => commit(C.ADD, data))
  },
  remove ({commit}, id) {
    return fetch('/api/list', {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers
    })
      .then(res => res.json())
      .then(() => commit(C.REMOVE, id))
  },
  update ({commit}) {
    return fetch('/api/list')
      .then(res => res.json())
      .then(data => commit(C.UPDATE, data))
  }
}
