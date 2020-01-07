/**
* @author 水印红枫
* @date 2019/12/31 14:14
* @Description:
*/

<template>
  <div id="more">
    <img class="img" :src="imgSrc" @click="clickI">
    <input style="display: none" ref="imgInput" @change="addImg" type="file" accept="image/*" id="upload"
           name="upload">
    <input class="input" @focus="focus" placeholder="请输入食物名称" v-model="name">
    <p class="p" v-show="pShow">请输入食物名称</p>
    <button class="button" @click="addFood">添加食物</button>
    <div class="view">
      <MoodCard :data="item" v-for="(item, index) in mood_value" :key=index></MoodCard>
    </div>
  </div>
</template>

<script>
import MoodCard from '../../components/MoodCard'

export default {
  name: 'more',
  components: {
    MoodCard
  },
  data () {
    return {
      imgSrc: require('@/common/image/青椒鸡蛋.jpg'),
      name: '',
      img: '',
      pShow: false,
      mood_value: []
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      this.getMood()
    },
    getMood () {
      this.$http.getMood({}).then((res) => {
        if (res.flag === 1) {
          this.mood_value = res.data
        }
      })
    },
    clickI () {
      let imgInput = this.$refs.imgInput
      imgInput.click()
    },
    focus () {
      this.pShow = false
    },
    addImg () {
      let imgInput = this.$refs.imgInput
      let data = new FormData()
      data.append('file', imgInput.files[0])
      this.UploadImg(data)
      let reader = new FileReader()
      reader.readAsDataURL(imgInput.files[0])
      // let _this = this
      reader.onload = function (e) {
        // _this.img = this.result
      }
    },
    UploadImg (data) {
      this.$http.UploadImg({
        data
      }).then((res) => {
        if (res.flag === 1) {
          this.img = res.msg
          this.$Dialog.Dialog({
            text: '上传成功',
            type: 'quit'
          })
          this.imgSrc = 'http://182.92.207.81/serveltDemo_war_exploded/pic/' + res.msg
          console.log('成功')
        } else {
          this.$Dialog.Dialog({
            text: '上传失败，请重新上传',
            type: 'quit'
          })
          console.log('失败')
          this.img = ''
        }
      })
    },
    addFood () {
      if (this.name === '') {
        this.pShow = true
        return
      }
      if (this.img === '') {
        this.$Dialog.Dialog({
          text: '请先上传图片',
          type: 'quit'
        })
        return
      }
      this.$http.addFood({
        name: this.name,
        img: this.img
      }).then((res) => {
        if (res.flag === 1) {
        } else {
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
  #more {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 3rem;
    right: 0;
    padding: 1rem
  }

  #more .img {
    width: 23rem;
    height: 10rem;
  }

  #more .input {
    width: 21rem;
    margin: 1rem;
    text-align: center;
    border-radius: 4px;
    height: 3rem;
    line-height: 3rem;
    border: 0;
    outline: 0;
  }

  #more .button {
    width: 21rem;
    margin-left: 1rem;
    text-align: center;
    border-radius: 4px;
    background-color: red;
    height: 3rem;
    line-height: 3rem;
  }

  #more .p {
    color: red;
    width: 23rem;
    text-align: center;
    margin: 0 auto;
  }

  #more .view {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    top: 20rem;
    overflow-y: auto;
  }
</style>
