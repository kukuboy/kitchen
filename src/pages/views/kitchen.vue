/**
* @author 水印红枫
* @date 2019/12/31 16:40
* @Description:
*/

<template>
  <div id="kitchen" ref="kitchen">
    <MyFood :data="food_data" @MailSuccess="MailSuccess"></MyFood>
    <div class="all" v-if="allShow">已加载全部</div>
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
      size: 5,
      kitchen: '',
      // 减少请求次数，提高性能
      pageSize: 0,
      allShow: false
    }
  },
  mounted () {
    this.init()
    this.query()
  },
  destroyed () {
    this.kitchen.removeListener('scroll', this.scroll, false)
  },
  methods: {
    init () {
      this.kitchen = this.$refs.kitchen
      this.kitchen.addEventListener('scroll', this.scroll, false)
    },
    scroll () {
      console.log(this.kitchen.scrollTop, this.kitchen.clientHeight)
      if (this.page === this.pageSize || this.allShow) {
        return
      }
      console.log(this.kitchen.scrollTop, this.kitchen.clientHeight)
      if (this.kitchen.scrollTop + this.kitchen.scrollHeight >= this.kitchen.clientHeight) {
        this.$Dialog.Rotate({
          ele: this.view
        })
        this.page += this.size
        this.getFood()
      }
    },
    query () {
      this.getFood()
    },
    getFood () {
      this.pageSize = this.page
      this.$http.getFood({
        page: this.page,
        size: this.size
      }).then((res) => {
        this.pageSize -= 1
        this.$Dialog.Rotate({
          ele: this.view,
          state: 'end'
        })
        if (res.data.length < 5) {
          this.allShow = true
        }
        console.log(res)
        this.food_data = this.food_data.concat(res.data)
      })
    },
    MailSuccess () {
      this.pageSize -= 1
      this.refresh()
    },
    refresh () {
      this.$http.getFood({
        page: 0,
        size: this.size + this.page
      }).then((res) => {
        if (res.data.length < 5) {
          this.allShow = true
        }
        console.log(res)
        this.food_data = res.data
      })
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

  #kitchen .all {
    text-align: center;
    width: 23rem;
    padding: 1rem;
  }
</style>
