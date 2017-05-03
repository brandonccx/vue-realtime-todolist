<template>
  <div class="todolist">
    <h1 class="center title">TODO List</h1>
    <mu-flexbox>
      <mu-flexbox-item class="center">
        <mu-text-field label="Name" labelFloat
          hintText="Enter an item name"
          v-model="input"/>
        <mu-float-button @click="add" icon="add" mini/>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-paper v-for="item in list" :key="item.id" :zDepth="2"
      class="center item">
      <mu-flexbox>
        <mu-flexbox-item>
          <span>{{item.name}}</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-icon-button class="pull-right"
            icon="close"
            @click="remove(item.id)"/>
          <mu-icon-button class="pull-right"
            icon="flight_takeoff"
            @click="run(item.id)"/>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-paper>
  </div>
</template>

<script>
let getList = fetch('/api/list')
let headers = new Headers({
  'content-type': 'application/json;charset=utf-8'
})

export default {
  name: 'todolist',
  data () {
    return {
      input: '',
      list: []
    }
  },
  created: function () {
    getList
      .then((res) => res.json())
      .then((data) => {
        this.list = data
      })
  },
  methods: {
    add () {
      if (this.input === '') {
        return
      }
      let data = {
        name: this.input
      }
      fetch('/api/list', {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
        .then((res) => res.json())
        .then((data) => {
          this.list.push(data)
          this.input = ''
        })
    },
    remove (id) {
      fetch('/api/list', {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers
      })
        .then((res) => res.json())
        .then((data) => {
          var d = this.list.filter((data) => data.id === id)[0]
          this.list.splice(this.list.indexOf(d), 1)
        })
    },
    run (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
  margin: 0 auto;
}
.pull-right {
  float: right;
}
.title {
  margin-top: 60px;
  display: block;
}
.item {
  width: 320px;
  margin-bottom: 20px;
  padding: 0 20px 0;
  text-align: left;
}
</style>
