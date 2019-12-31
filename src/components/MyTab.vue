/**
* @author 水印红枫
* @date 2019/12/31 14:18
* @Description:
*/

<template>
  <div id="MyTab" ref="MyTab">
    <div class="tab" ref="tab" v-for="(item, index) in data" :key="index" @click="clickP(index)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    data: Array
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let tab = this.$refs.tab
      let MyTab = this.$refs.MyTab
      for (let i of tab) {
        i.style.width = parseInt(MyTab.clientWidth / this.data.length) - 1 + 'px'
      }
    },
    clickP (index) {
      this.$router.push({
        name: this.data[index].path
      })
    }
  }
}
</script>

<style>
  #MyTab {
    position: fixed;
    height: 3rem;
    color: #FFFFFF;
    left: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  #MyTab .tab {
    border: 0.5px;
    height: 3rem;
    display: inline-block;
    color: #333333;
    text-align: center;
  }
</style>
