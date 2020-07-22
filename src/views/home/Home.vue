<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"></tab-control>
<!--    内部传过来scroll，pullingup事件，通过contentScroll,loadMore方法实现-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";
  import NavBar from "components/common/navbar/NavBar";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";


  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {BACK_POSITION} from "common/const";


  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      NavBar,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        // isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        // itemImgListener:null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }

    },
    destroyed() {
      console.log('home des');
    },
    activated() {
      console.log('actived');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
      console.log(this.saveY);
    //  取消全局事件监听
      this.$bus.$off('ItemImageLoad',this.itemImgListener)
    },
    created() {
      //组件创建完成发送网络请求
    //  1.请求多个数据
      this.getHomeMultidata()
    //  2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      //  监听item中图片加载完成,防抖操作
      // let newRefresh=debounce(this.$refs.scroll.refresh,100)
      // //对监听事件进行保存
      // this.itemImgListener=()=>{
      //   newRefresh()
      // }
      // this.$bus.$on('ItemImageLoad',this.itemImgListener)
      //获取tab-control的offset
      //所有的组件都有一个$el属性，用于获取数组中的元素
      console.log('mounted');
      this.tabClick(0)
    },
    methods:{

      //网络请求相关
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          //完成了上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
    //  事件监听相关
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      // backClick(){
      //   //500毫秒之内滚到顶部
      //   this.$refs.scroll.scrollTo(0,0)
      // },
      contentScroll(position){
        // console.log(position);判断backTop是否显示
        this.isShowBackTop = (-position.y) > BACK_POSITION
      //  决定tabControl是否吸顶（position:fixed）
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        console.log('上拉加载更多');
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    position:relative;
    z-index: 9;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .content{

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
