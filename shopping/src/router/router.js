import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/list.vue'
import ProductDetail from '../views/productDetail.vue'
import Cart from '../views/cart.vue'
Vue.use(Router)
const routes=[

{
  path:'*',
  redirect:'./list'
},

{
  path:'/list',
  component:List,
  meta:{
    title:'电商官网'
  }
  },

  {
    path:'/product/:id',
    component:ProductDetail,
    meta:{
      title:'商品详情'
    }

},
{
  path:'/cart',
  component:Cart,
  meta:{
    title:'购物车'
  }


}
]
const router=new Router({
 routes,
 mode:'history'
})
router.beforeEach((to,from,next)=>{
  window.document.title=to.meta.title;
  next();
})
export default router;
