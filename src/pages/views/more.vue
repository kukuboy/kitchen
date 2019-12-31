/**
* @author 水印红枫
* @date 2019/12/31 14:14
* @Description:
*/

<!--
 * @作者： 丁亚辉
 * @日期： 2019/11/21 19:56
-->

<template>
  <div id="more">
    <img class="img" :src="imgSrc" @click="clickI">
    <input style="display: none" ref="imgInput" @change="addImg" type="file" accept="image/*" id="upload"
           name="upload">
    <input v-model="name">
  </div>
</template>

<script>
export default {
  name: 'more',
  data () {
    return {
      imgSrc: require('@/common/image/青椒鸡蛋.jpg'),
      name: ''
    }
  },
  mounted () {
  },
  methods: {
    clickI () {
      let imgInput = this.$refs.imgInput
      imgInput.click()
    },
    addImg () {
      let imgInput = this.$refs.imgInput
      let reader = new FileReader()
      reader.readAsDataURL(imgInput.files[0])
      let _this = this
      reader.onload = function (e) {
        _this.addFood(this.result)
      }
    },
    addFood (data) {
      this.$http.addFood({
        name: this.name,
        img: data
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  #more {
  }

  #more .img {
    width: 21rem;
    margin-left: 2rem;
    height: 10rem;
  }
</style>
