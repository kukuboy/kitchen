/**
* @author 水印红枫
* @date 2019/12/31 16:44
* @Description:
*/

<template>
  <div id="MyFood">
    <div class="food" v-for="(item, index) in data" :key=index>
      <img class="img" :src="imgSrc[index]" @click="clickI(imgSrc[index])">
      <div class="text" style="bottom: 3rem"><img class="img" :src="classes[item.classNum].img">{{item.name}}</div>
      <div class="text"><img @click="clickP(item, index)" class="img" src="../common/image/邮件.png">{{item.num}}</div>
    </div>
  </div>
</template>

<script>
// import nodemailer from '../common/js/nodemailer'

export default {
  name: 'MyFood',
  data () {
    return {
      click: false,
      classes: [
        {
          name: '素食',
          img: require('@/common/image/素食.png')
        }, {
          name: '荤食',
          img: require('@/common/image/肉食.png')
        }, {
          name: '汤类',
          img: require('@/common/image/汤.png')
        }, {
          name: '其他',
          img: require('@/common/image/食物.png')
        }
      ]
    }
  },
  computed: {
    imgSrc () {
      let Array = []
      for (let i of this.data) {
        if (i.img === '') {
          Array.push(require('@/common/image/青椒鸡蛋.jpg'))
        } else {
          Array.push('http://182.92.207.81/serveltDemo_war_exploded/pic/' + i.img)
        }
      }
      return Array
    }
  },
  props: {
    data: Array
  },
  mounted () {
  },
  methods: {
    clickP (item, index) {
      console.log('你点了' + item.name + this.imgSrc[index])
      // this.Mail('18860360510@163.com', item.name, this.imgSrc[index])
      // this.Mail('1762721716@qq.com', item.name, this.imgSrc[index])
      // let mailOptions = {
      //   from: '"laogon"', // sender address
      //   to: '2294211995@qq.com', // list of receivers
      //   subject: 'Hello', // Subject line
      //   // 发送text或者html格式npm
      //   // text: 'Hello world?', // plain text body
      //   html: '<h1>' + item.name + 'Hello world</h1>' // html body
      // }
      // nodemailer.sentMail(mailOptions)
    },
    clickI (img) {
      this.$router.push({
        name: 'img',
        params: {
          img: img
        }
      })
    },
    Mail (email, name, img) {
      if (this.click) {
        return
      }
      this.click = true
      this.$http.Mail({
        email: email,
        text: name,
        img: img
      }).then((res) => {
        this.click = false
        if (res.flag === 1) {
          console.log('成功')
          this.$Dialog.Dialog({
            text: '点菜成功',
            type: 'quit'
          })
          this.$emit('MailSuccess')
        } else {
          console.log('失败')
          this.$Dialog.Dialog({
            text: '点菜失败',
            type: 'quit'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  #MyFood {
    position: relative;
  }

  #MyFood .food {
    position: relative;
    width: 18rem;
    height: 16rem;
    margin: 1rem 0;
    background-color: #111111;
    box-shadow: 4px 4px 4px 4px #e1b6b6;
  }

  /*#MyFood .food :hover{*/
  /*  position: relative;*/
  /*  width: 22rem;*/
  /*  height: 5rem;*/
  /*  margin: 1rem 0;*/
  /*  animation: img 3s linear 0s infinite normal;*/
  /*}*/
  /*@keyframes img {*/
  /*  0%{background-image: url("../common/image/chl.jpg")}*/
  /*  20%{background-image: url("../common/image/你和我.jpg")}*/
  /*  40%{background-image: url("../common/image/chl.jpg")}*/
  /*  60%{background-color: #333333}*/
  /*  80%{background-color: #444444}*/
  /*  100%{background-color: #555555}*/
  /*}*/

  #MyFood .food .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 18rem;
    height: 10rem;
  }

  #MyFood .food .text {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 16rem;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    background-color: #FFFFFF;
    display: inline-block;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333333;
    text-align: right;
  }

  #MyFood .food .text .img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.25rem;
  }

  #MyFood .food .text .img:active {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
  }
</style>
