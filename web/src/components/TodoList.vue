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
          <mu-circular-progress mode="determinate"
            :value="item.progress" :size="32"
            v-if="item.progress !== 100"/>
          <mu-icon value="done" color="green"
            v-if="item.progress === 100"/>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-icon-button class="pull-right"
            icon="close"
            @click="remove(item.id)"/>
          <mu-icon-button class="pull-right"
            v-if="item.progress === 0"
            icon="flight_takeoff"
            @click="run(item.id)"/>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-paper>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'todolist',
  data () {
    return {
      input: ''
    }
  },
  computed: {
    ...mapState(['list'])
  },
  created: function () {
    this.update()
  },
  methods: {
    ...mapActions(['update']),
    add () {
      this.$store.dispatch('add', this.input)
        .then(() => (this.input = ''))
    },
    remove (id) {
      this.$store.dispatch('remove', id)
    },
    run (id) {
      this.$store.dispatch('run', id)
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
  width: 400px;
  margin-bottom: 20px;
  padding: 0 20px 0;
  text-align: left;
}
.mu-circular-progress {
  margin-top: 4px;
}
</style>
