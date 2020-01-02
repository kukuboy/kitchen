/**
* @author 水印红枫
* @date 2019/12/31 16:44
* @Description:
*/

<template>
  <div id="MyFood">
    <div class="food" @click="clickP(item)" v-for="(item, index) in data" :key=index>
      <img class="img" :src="imgSrc">
      <div class="text">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
// import nodemailer from '../common/js/nodemailer'

export default {
  name: 'MyFood',
  data () {
    return {
      imgSrc: require('@/common/image/青椒鸡蛋.jpg')
    }
  },
  props: {
    data: Array
  },
  mounted () {
  },
  methods: {
    clickP (item) {
      console.log('你点了' + item.name)
      // this.Mail('18860360510@163.com', item.name)
      this.Mail('1762721716@qq.com', item.name)
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
    Mail (email, name) {
      this.$http.Mail({
        email: email,
        text: name
      }).then((res) => {
        if (res.flag === 1) {
          console.log('成功')
          this.$Dialog.Dialog({
            text: '点菜成功',
            type: 'quit'
          })
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
    height: 10rem;
    margin: 1rem 0;
  }

  #MyFood .food .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 20rem;
    height: 10rem;
  }

  #MyFood .food .text {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20rem;
    height: 3rem;
    color: #FFFFFF;
    line-height: 3rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
