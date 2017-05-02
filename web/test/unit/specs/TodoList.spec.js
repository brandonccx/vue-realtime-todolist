import Vue from 'vue'
import TodoList from '@/components/TodoList'

describe('TodoList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(TodoList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.todolist h1').textContent)
      .to.equal('TODO List')
  })
})
