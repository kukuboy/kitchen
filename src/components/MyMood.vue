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
    <div class="value">{{value}}</div>
    <div class="star" ref="star">
      <div class="ball" ref="ball" @click="clickB(item,i)" v-for="(item, i) in mood" :key=i>
        <img v-if="index>=i" class="img" src="../common/image/蓝心.png">
        <img v-else class="img" src="../common/image/爱心.png">
      </div>
    </div>
    <div class="warn" v-if="warn">随便写点什么吧</div>
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
      index: -1,
      date: '',
      time: '',
      warn: false
    }
  },
  watch: {
    text_value: {
      handler (newVal, oldVal) {
        if (newVal === '') {
          this.warn = true
        } else {
          this.warn = false
        }
      }
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
      // let ball = this.$refs.ball
      // let star = this.$refs.star
      // let l = parseInt(25 / this.mood.length)
      // l = l > 2 ? 2 : l
      // for (let i of ball) {
      //   i.style.width = l + 'rem'
      //   i.style.height = l + 'rem'
      // }
      // star.style.marginLeft = (25 - ((l + 2) * this.mood.length)) / 2 + 'rem'
    },
    clickB (item, index) {
      this.index = index
      let ball = this.$refs.ball
      for (let i in ball) {
        // ball[i].style.backgroundColor = '#FFFFFF'
        if (i <= index) {
          // ball[i].style.backgroundColor = 'red'
        }
      }
      this.value = item.value
    },
    addMood () {
      if (this.index < 0) {
        this.value = '请先点击下方心情指数'
        return
      }
      if (this.text_value === '') {
        this.warn = true
        return
      }
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
    position: absolute;
    background-color: #FFFFFF;
    /*background-color: rgba(81, 22, 32, 0.9);*/
    top: 0;
    /*padding-bottom: 8rem;*/
  }

  #MyMood .loveTime {
    width: 21rem;
    padding: 1rem 2rem;
    background-color: #FFFFFF;
    height: 4rem;
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 4px;
    color: #8ec3bd;
    -webkit-box-shadow: 8px 8px 8px 8px #8ec3bd;
    box-shadow: 8px 8px 8px 8px #8ec3bd;
    text-align: center;
    /*color: #FFFFFF;*/
    text-shadow: 10px 10px 10px red;
  }

  #MyMood .star {
    padding: 0 5rem;
    width: 15rem;
    -webkit-box-shadow: 8px 8px 8px 8px #8ec3bd;
    box-shadow: 8px 8px 8px 8px #8ec3bd;
  }

  #MyMood .star .ball {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background-color: #FFFFFF;
    margin: 1rem;
  }

  #MyMood .star .ball .img {
    width: 3rem;
    /*box-shadow: 1px 1px 1px 1px blue;*/
  }

  #MyMood .value {
    width: 25rem;
    text-align: center;
    height: 3rem;
    /*border: 0.5px solid #999999;*/
    /*border-left: 0;*/
    /*border-right: 0;*/
    border-right: 4px;
    background-color: #FFFFFF;
    line-height: 3rem;
    color: blue;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 2px 2px 2px red;
    margin: 2rem 0;
  }

  #MyMood .warn {
    width: 25rem;
    text-align: center;
    color: red;
  }

  #MyMood .text {
    width: 20rem;
    height: 10rem;
    border: 0.5px solid red;
    /*outline: none;*/
    margin: 2rem;
    font-size: 1.2rem;
    padding: 0.5rem;
    -webkit-box-shadow: 8px 8px 8px 8px #8ec3bd;
    box-shadow: 8px 8px 8px 8px #8ec3bd;
  }

  #MyMood .button {
    width: 23rem;
    margin: 1rem;
    border: 0;
    border-radius: 4px;
    background-color: #FF332E;
    /*color: #FFFFFF;*/
    height: 2.5rem;
    line-height: 2.5rem;
    -webkit-box-shadow: 8px 8px 8px 8px #8ec3bd;
    box-shadow: 8px 8px 8px 8px #8ec3bd;
  }

  #MyMood .title {
    width: 25rem;
    margin: 1rem 0;
    text-align: center;
    border: 0;
    border-radius: 4px;
    height: 4rem;
    color: #8ec3bd;
    font-size: 1.5rem;
    text-shadow: 15px 15px 15px red;
    font-weight: bolder;
    line-height: 4rem;
  }
</style>
