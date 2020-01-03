<!--
 * @作者： 丁亚辉
 * @日期： 2020/1/2 18:55
-->

<template>
  <div id="MyMood">
    <div class="title">今天也要开心啊</div>
    <div class="loveTime">
      <div>我们已经相爱了</div>
      {{love_time}}
    </div>
    <div class="star" ref="star">
      <div class="ball" ref="ball" @click="clickB(item,index)" v-for="(item, index) in mood" :key=index></div>
    </div>
    <div class="value">{{value}}</div>
    <textarea class="text" placeholder="今天也写点什么吧" v-model="text_value"></textarea>
    <button @click="addMood" class="button">发布</button>
  </div>
</template>

<script>
import utils from '../common/util/utils'

export default {
  name: 'MyMood',
  props: {
    mood: Array
  },
  data () {
    return {
      value: '猜我今天的心情怎么样',
      text_value: '',
      index: 0,
      date: '',
      time: ''
    }
  },
  computed: {
    love_time () {
      return utils.love(this.date, '2017-05-10')
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    clearInterval(this.time)
  },
  methods: {
    init () {
      this.time = setInterval(() => {
        this.date = new Date().getTime()
      }, 100)
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
      this.index = index
      let ball = this.$refs.ball
      for (let i in ball) {
        ball[i].style.backgroundColor = '#FFFFFF'
        if (i <= index) {
          ball[i].style.backgroundColor = 'red'
        }
      }
      this.value = item.value
    },
    addMood () {
      this.$http.addMood({
        star: this.index,
        value: this.value,
        text: this.text_value,
        img: '1111',
        time: new Date().getTime()
      }).then((res) => {
        if (res.flag === 1) {
          console.log('成功')
        } else {
          console.log('失败')
        }
        this.$Dialog.Dialog({
          text: res.msg,
          type: 'quit'
        })
      })
    }
  }
}
</script>

<style scoped>
  #MyMood {
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #MyMood .loveTime {
    width: 23rem;
    margin: 1rem;
    background-color: #FFFFFF;
    height: 4rem;
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 2px 2px 2px red;
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
    width: 21rem;
    text-align: center;
    height: 3rem;
    margin: 1rem 2rem;
    border-right: 4px;
    background-color: #FFFFFF;
    line-height: 3rem;
    font-size: 1.1rem;
    text-shadow: 2px 2px 2px red;
  }

  #MyMood .text {
    width: 20rem;
    height: 10rem;
    border: 0;
    outline: none;
    margin: 2rem;
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  #MyMood .button {
    width: 23rem;
    margin: 1rem;
    border: 0;
    border-radius: 4px;
    background-color: #FF332E;
    color: #FFFFFF;
    height: 2.5rem;
    line-height: 2.5rem;
  }

  #MyMood .title {
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
