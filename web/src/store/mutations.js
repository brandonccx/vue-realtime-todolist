import * as C from './consts'

export default {
  [C.ADD] (state, data) {
    state.list.push(data)
  },
  [C.REMOVE] (state, id) {
    state.list.forEach((item, i) => {
      if (item.id === id) {
        state.list.splice(i, 1)
        return false
      }
    })
  },
  [C.UPDATE] (state, data) {
    if (data instanceof Array) {
      state.list = data
    }
  }
}
