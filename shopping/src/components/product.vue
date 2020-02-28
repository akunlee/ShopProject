<template>
<div class="product">
  <router-link :to="'/product/'+info.id"
  class="product-main">
    <img :src="info.image">
    <h4>{{info.name}}</h4>
    <div class="product-color"
    :style="{background:colors[info.color]}"></div>
    <div class="product-cost">￥{{info.cost}}</div>
    <div class="product-add-cart"
    @click.prevent="handleCart">加入购物车</div>
     <span class="salesNum">销量:{{info.sales}}</span>
  </router-link>
<Success id="success"
v-show="success"></Success>
</div>
</template>
<script>
  import Success from './seccess.vue';
  
  export default{
    components:{
      Success
    },
    props:{
      info:Object
    },
    data(){
      return {
        colors:{
          '白色':'#fff',
          '蓝色':'#1a2a5d',
          '红色':'#ff0000',
          '金色':'#f3cc13',
          '银色':'#b3b3b1',
          '黑色':'#000'

        },
        success:false
      }
    },
    methods:{
      handleCart(){
        this.$store.commit('addCart',this.info.id);
        this.success=true;
        setTimeout(()=>{
          this.success=false;

        },800);
       
      }
    },
    computed:{

    },
    mounted() {

    }
  }
</script>

<style scoped>
#success{
  position: absolute;
  top: 220px;
  left: 140px;
}
.salesNum{
  font-size: 14px;
 color: #66666e;
}
.product{
  width: 25%;
  float: left;
  position: relative;
}
.product-main{
  display: block;
  margin: 16px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
  text-decoration: none;
}
.product-main img{
  width: 100%;
}
h4{
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-main:hover h4{
  color: #0070c9;
}
.product-color{
  display: 16px;
  height: 16px;
  width: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}
.product-cost{
  color: #de4037;
  margin-top: 6px;
  margin-bottom: 5px;

}
.product-add-cart{
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.product-main:hover .product-add-cart{
  display: inline-block;
}
</style>
