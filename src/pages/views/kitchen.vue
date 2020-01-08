/**
* @author 水印红枫
* @date 2019/12/31 16:40
* @Description:
*/

<template>
  <div id="kitchen" ref="kitchen">
    <div class="left">
      <div class="icon" ref="icon" :key=index v-for="(item,index) in classes" @click="clickC(index)">
        <img :src=item.img>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="right" ref="right">
      <MyFood :data="food_data" @MailSuccess="MailSuccess"></MyFood>
      <div class="all" v-if="allShow">已加载全部</div>
    </div>
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
      right: '',
      // 减少请求次数，提高性能
      pageSize: 0,
      allShow: false,
      classes: [
        {
          name: '全部',
          img: require('@/common/image/菜单.png')
        },
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
      ],
      class: -1
    }
  },
  mounted () {
    this.init()
    this.query()
  },
  destroyed () {
    this.right.removeListener('scroll', this.scroll, false)
  },
  methods: {
    init () {
      this.right = this.$refs.right
      this.right.addEventListener('scroll', this.scroll, false)
      this.clickC(0)
    },
    scroll () {
      if (this.page === this.pageSize || this.allShow) {
        return
      }
      if (this.right.scrollTop + this.right.scrollHeight >= this.right.clientHeight) {
        this.$Dialog.Rotate({
          ele: this.view
        })
        this.page += this.size
        this.getFood()
      }
    },
    query () {
      // this.getFood()
    },
    clickC (index) {
      this.class = index
      this.food_data = []
      this.page = 0
      this.size = 5
      this.getFood()
      for (let i of this.$refs.icon) {
        i.style.color = '#333333'
        i.style.border = '0'
      }
      this.$refs.icon[index].style.color = 'red'
      this.$refs.icon[index].style.border = '0.5px solid red'
    },
    getFood () {
      this.pageSize = this.page
      this.$http.getFood({
        page: this.page,
        size: this.size,
        class: this.class - 1
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
        size: this.size + this.page,
        class: this.class - 1
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
    right: 0;
    bottom: 4rem;
  }

  #kitchen .left {
    width: 5rem;
    display: inline-block;
    height: 100%;
    position: absolute;
    left: 2px;
    top: 2px;
    box-shadow: 2px 2px 2px 2px #aa8a8a;
  }

  #kitchen .left .icon {
    width: 4rem;
    margin: 2rem 0.4rem;
    text-align: center;
    box-shadow: 2px 2px 2px 2px #aa8a8a;
  }

  #kitchen .left .icon img {
    width: 2rem;
  }

  #kitchen .left .icon p {
    margin: 0 auto;
  }

  #kitchen .right {
    width: 18rem;
    display: inline-block;
    height: 100%;
    position: absolute;
    left: 6rem;
    top: 0;
    bottom: 0;
    overflow-y: auto;
  }

  #kitchen .right::-webkit-scrollbar {
    display: none;
  }
  #kitchen .right .all {
    text-align: center;
    width: 16rem;
    padding: 1rem;
  }
</style>
