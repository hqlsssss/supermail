<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages">
      </detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {BACK_POSITION} from "common/const";


  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        // itemImgListener:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      //保存传入的id
      this.iid=this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        console.log(res);
        const data=res.result
        this.topImages=data.itemInfo.topImages
        console.log(this.topImages);
      //  获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //  创建店铺信息
        this.shop=new Shop(data.shopInfo)
      //  获取商品详细信息
        this.detailInfo=data.detailInfo
      //  获取商品参数
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //  获取评论
        if(data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }

      })
      //请求推荐数据
      getRecommend().then(res=>{
        this.recommends=res.data.list
      })
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },100)
    },
    updated() {

    },
    mounted() {
      console.log('mounted');

    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    components:{
      DetailBottomBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      BackTop,
      Scroll
    },
    methods:{
      // imageLoad(){
      //   this.$refs.scroll.refresh()
      // }
      detailImageLoad(){
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index){
        console.log('titleClick');
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        const positionY=-position.y
        let length=this.themeTopYs.length
        for(let i=0;i<length;i++){
          if(this.currentIndex!==i&&(i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||
            (i === length-1&&positionY>=this.themeTopYs[i])){
            this.currentIndex=i
            console.log(i);
            this.$refs.nav.currentIndex=this.currentIndex
          }
        }
        this.isShowBackTop = (-position.y) > BACK_POSITION
      },
      addToCart(){
        //获取购物商品需要展示的信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid
        console.log('addToCart');
      //  添加到购物车
        this.$store.commit('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 1;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position:relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
