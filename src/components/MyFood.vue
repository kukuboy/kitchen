/**
* @author 水印红枫
* @date 2019/12/31 16:44
* @Description:
*/

<template>
  <div id="MyFood">
    <div class="food" @click="clickP(item, index)" v-for="(item, index) in data" :key=index>
      <img class="img" :src="imgSrc[index]">
      <div class="text_left">{{item.name}}</div>
      <div class="text_right">点过{{item.num}}次</div>
    </div>
  </div>
</template>

<script>
// import nodemailer from '../common/js/nodemailer'

export default {
  name: 'MyFood',
  data () {
    return {
      click: false
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
      this.Mail('1762721716@qq.com', item.name, this.imgSrc[index])
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
    padding: 0 2.5rem;
  }

  #MyFood .food {
    position: relative;
    width: 20rem;
    height: 13rem;
    margin: 1rem 0;
    background-color: #111111;
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
    width: 20rem;
    height: 10rem;
  }

  #MyFood .food .text_left {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 13rem;
    height: 3rem;
    color: #333333;
    line-height: 3rem;
    text-align: left;
    padding-left: 1rem;
    background-color: #FFFFFF;
    display: inline-block;
  }

  #MyFood .food .text_right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 5rem;
    height: 3rem;
    color: #333333;
    line-height: 3rem;
    padding-right: 1rem;
    text-align: right;
    background-color: #FFFFFF;
    display: inline-block;
  }
</style>
