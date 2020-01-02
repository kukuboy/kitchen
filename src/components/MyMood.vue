<!--
 * @作者： 丁亚辉
 * @日期： 2020/1/2 18:55
-->

<template>
  <div id="MyMood">
    <div class="title">今天也要开心啊</div>
    <div class="star" ref="star">
      <div class="ball" ref="ball" @click="clickB(item,index)" v-for="(item, index) in mood" :key=index></div>
    </div>
    <div class="value">{{value}}</div>
    <textarea class="text" placeholder="今天也写点什么吧" v-model="text_value"></textarea>
    <button class="button">发布</button>
  </div>
</template>

<script>
export default {
  name: 'MyMood',
  props: {
    mood: Array
  },
  data () {
    return {
      value: '猜我今天的心情怎么样',
      text_value: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let ball = this.$refs.ball
      let star = this.$refs.star
      let l = parseInt(25 / this.mood.length)
      l = l > 2 ? 2 : l
      for (let i of ball) {
        i.style.width = l + 'rem'
        i.style.height = l + 'rem'
      }
      star.style.marginLeft = (25 - ((l + 2) * this.mood.length)) / 2 + 'rem'
    },
    clickB (item, index) {
      let ball = this.$refs.ball
      for (let i in ball) {
        ball[i].style.backgroundColor = '#FFFFFF'
        if (i <= index) {
          ball[i].style.backgroundColor = 'red'
        }
      }
      this.value = item.value
    }
  }
}
</script>

<style scoped>
  #MyMood {
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #MyMood .star {
    left: 0;
    top: 0;
  }

  #MyMood .star .ball {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: inline-block;
    background-color: #FFFFFF;
    margin: 1rem;
  }

  #MyMood .value {
    width: 25rem;
    text-align: center;
    height: 3rem;
    background-color: #FFFFFF;
    line-height: 3rem;
    font-size: 1.1rem;
    text-shadow: 2px 2px 2px red;
  }

  #MyMood .text {
    width: 21rem;
    height: 10rem;
    border: 0;
    outline: none;
    margin: 2rem;
  }
  #MyMood .button{
    width: 23rem;
    margin: 1rem;
    border: 0;
    border-radius: 4px;
    background-color: #FF332E;
    color: #FFFFFF;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  #MyMood .title{
    width: 23rem;
    margin: 1rem;
    text-align: center;
    border: 0;
    border-radius: 4px;
    background-color: #000000;
    color: #FFFFFF;
    height: 2.5rem;
    line-height: 2.5rem;
  }
</style>
