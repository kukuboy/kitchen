/**
* @author 水印红枫
* @date 2020/1/3 9:12
* @Description:
*/

<template>
  <div id="MoodCard">
    <div class="time">
      <div>相爱时间</div>
      {{time}}
    </div>
    <div class="text">
      {{data.text}}
    </div>
    <div class="mood">
      {{data.value}}
    </div>
  </div>
</template>

<script>
import util from '../common/util/utils'

export default {
  name: 'MoodCard',
  data () {
    return {}
  },
  computed: {
    time () {
      return util.love(Number(this.data.time), '2017-05-10')
    }
  },
  props: {
    data: Object
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped>
  #MoodCard {
    position: relative;
    min-height: 20rem;
    width: 23rem;
    margin: 1rem;
    background-color: #FFFFFF;
    border: 0.5px solid;
    box-shadow: 1px 1px 1px 1px;
  }

  #MoodCard .time {
    width: 21rem;
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

  #MoodCard .text {
    width: 19rem;
    margin: 1rem;
    padding: 1rem;
    border-bottom: 0.5px solid #333333;
    background-image: url("../common/image/你和我.jpg");
    background-size: cover;
    min-height: 7rem;
    color: #FFFFFF;
    font-size: 1.1rem;
  }

  #MoodCard .mood {
    position: absolute;
    bottom: 0;
    width: 23rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.1rem;
    font-weight: bolder;
    text-align: center;
  }
</style>
