<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    text-align: center;
    position: fixed;
    z-index: 9;
    background-color: #ffffff;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 49px;
  }
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item>div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin:5px auto 3px;
    background:url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position: 0 -54px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .select {
    background-position: 0px 0;
  }
  .bar-left{
    align-items: flex-end;
  }
  .bar-right{
    font-size: 15px;
    color: #ffffff;
    line-height: 58px;
  }
  .bar-right .cart{
    line-height: 49px;
    background: yellow;
    flex: 1;
    color:#000;
  }
  .bar-right .buy{
    line-height: 49px;
    background: var(--color-high-text);
    flex: 1;
  }


</style>
