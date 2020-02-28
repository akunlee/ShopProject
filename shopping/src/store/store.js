import Vue from 'vue';
import Vuex from 'vuex';
import product_data from '../../product.js';
import storage from 'storejs';

Vue.use(Vuex);
function getFilterArray(array){
    const res=[];
    const json={};
    for(let i=0;i<array.length;i++){
      const _self=array[i];
      if(!json[_self]){
        res.push(_self);
        json[_self]=1;
      }
    }
    return res;
  }
const store=new Vuex.Store({
 state:{
productList:[],
cartList:storage.get('cartList')||[]
 } ,
 getters:{
brands:state=>{
  const brands=state.productList.map(item=>item.brand);
  return getFilterArray(brands);
},
colors:state=>{
  const colors=state.productList.map(item=>item.color);
  return getFilterArray(colors);
}
 },

 mutations:{

   // 清空购物车
   emptyCart(state){
     state.cartList=[];
     storage.remove('cartList');
   },
   // 修改商品数量
   editCartCount(state,payload){
     const product=state.cartList.find(item=>item.id===payload.id);
     product.count+=payload.count;
      storage.set('cartList',state.cartList);
      window.location.reload();

   },
   // 删除商品
    deleteCart(state,id){
      const index=state.cartList.findIndex(item=>item.id===id);
      state.cartList.splice(index,1);
   storage.set('cartList',state.cartList);
    window.location.reload();

    },

  setProductList(state,data){
    state.productList=data;
  },
  addCart(state,id){
  const isAdded=state.cartList.find(item=>item.id===id);
  if(isAdded){
    isAdded.count ++;
  }else{
    state.cartList.push({
      id:id,
      count:1
    })
  }
  storage.set('cartList',state.cartList);
  }

 },
 actions:{
    // 获取数据到mutations
   getProductList(context){
     setTimeout(()=>{
       context.commit('setProductList',product_data);
     },500);
   },
   // 购买
   buy(context){
     return new Promise(resolve=>{
       setTimeout(()=>{
         context.commit('emptyCart');
         resolve();
       },500)
     });
   }

 }
})
export default store;
