<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :product="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    /*根据大小决定一行显示几个*/
    flex-wrap: wrap;
    justify-content: space-around;
  }

</style>
