/**
* @author 水印红枫
* @date 2019/12/31 16:40
* @Description:
*/

<template>
  <div id="kitchen">
    <MyFood :data="food_data" @MailSuccess="MailSuccess"></MyFood>
  </div>
</template>

<script>
import MyFood from '../../components/MyFood'

export default {
  name: 'kitchen',
  components: {
    MyFood
  },
  data () {
    return {
      food_data: [],
      page: 0,
      size: 5
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      this.getFood()
    },
    getFood () {
      this.$http.getFood({
        page: this.page,
        size: this.size
      }).then((res) => {
        console.log(res)
        this.food_data = res.data
      })
    },
    MailSuccess () {
      this.getFood()
    }
  }
}
</script>

<style scoped>
  #kitchen {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 3rem;
    overflow-y: auto;
  }
</style>
