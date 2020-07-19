<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav">
    </detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages">
      </detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam} from "../../network/detail";


  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{}
      }
    },
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
      })
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position:relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
