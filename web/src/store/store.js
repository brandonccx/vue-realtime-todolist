import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let headers = new Headers({
  'content-type': 'application/json;charset=utf-8'
})

const store = new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    add (state, data) {
      state.list.push(data)
    },
    remove (state, id) {
      state.list.forEach((item, i) => {
        if (item.id === id) {
          state.list.splice(i, 1)
          return false
        }
      })
    },
    update (state, data) {
      if (data instanceof Array) {
        state.list = data
      }
    }
  },
  actions: {
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
        .then(data => commit('add', data))
    },
    remove ({commit}, id) {
      return fetch('/api/list', {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers
      })
        .then(res => res.json())
        .then(() => commit('remove', id))
    },
    update ({commit}) {
      return fetch('/api/list')
        .then(res => res.json())
        .then(data => commit('update', data))
    }
  }
})

export default store
