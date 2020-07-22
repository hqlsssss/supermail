import Vue from "vue";
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)

//创建store对象
const store=new Vuex.Store({
  state:{
    //数组里面放商品对象
    cartList:[]
  },
  mutation:{
    addCart(state,payload){
      state.cartList.push(payload)
    }
  }
})
//挂载
export default store
