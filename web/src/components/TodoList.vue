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
    <mu-paper v-for="(item, i) in list" :key="i" :zDepth="2"
      class="center item">
      <mu-flexbox>
        <mu-flexbox-item>
          <span>{{item.name}}</span>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-icon-button class="pull-right"
            icon="close"
            @click="remove(i)"/>
          <mu-icon-button class="pull-right"
            icon="flight_takeoff"
            @click="run(item)"/>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: 'todolist',
  data () {
    return {
      input: '',
      list: []
    }
  },
  methods: {
    add () {
      if (this.input === '') {
        return
      }
      this.list.push({
        name: this.input,
        progress: 0
      })
      this.input = ''
    },
    remove (idx) {
      if (idx >= 0 && idx < this.list.length) {
        this.list.splice(idx, 1)
      }
    },
    run (item) {
      console.log(item.name)
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
