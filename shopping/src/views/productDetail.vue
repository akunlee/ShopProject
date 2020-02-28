<template>
  <div v-if="product">

    <div class="product">
    <div class="product-image">
      <img :src="product.image">
    </div>
     <div class="product-info">
       <h1 class="product-name">{{product.name}}</h1>
       <div class="product-cost">￥{{product.cost}}</div>
       <div class="product-add-cart"
       @click="handleAddToCart">
         加入购物车
       </div>
 <Success class="success"
 v-show="success"></Success>
     </div>

     <div class="product-desc">
       <h2>产品介绍</h2>
       <!-- <img v-for=" n in 10"
       src="http://ofjn5tuqf.qnssl.com/837a6c1447adca70726a5733d7e9523c.jpg"> -->
     </div>


    </div>

  </div>
</template>

<script>
  import product_data from '../../product.js';
  import Success from '../components/seccess.vue';
  export default{
    components:{
      Success
    },
    data(){
      return {
        id:parseInt(this.$route.params.id),
        product:null,
        success:false
      }
    },
    methods:{
      getProduct(){
        setTimeout(()=>{
          this.product=product_data.find(item=>item.id===this.id);
        },500);
      },
      handleAddToCart(){
        this.$store.commit('addCart',this.id);
        this.success=true;
        setTimeout(()=>{
          this.success=false;
        
        },800)
      }
    },
    mounted() {
      this.getProduct();
    }
  }
</script>

<style scoped>
  .success{
   position: absolute;
   top: 290px;
   left: 300px;
  }
h1{
  max-width: 650px;


}
  .product{

    margin: 32px;
    padding: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;
  }
  .product-image{
    width: 50%;
    height: 550px;
    float: left;
    text-align: center;
  }
  .product-image img{
    margin-top: 90px;
    height: 80%;
  }
  .product-info{
    position: relative;
    width: 50%;
    padding: 150px 0 250px;
    height: 150px;
    float: left;
    text-align: center;
  }

  .product-cost{
    color: #f2352e;
    margin: 8px 0;
  }
  .product-add-cart{
    display: inline-block;
    padding: 8px 64px;
    margin: 8px 0;
    background: lightblue;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .product-add-cart:hover{
    background: #2D8CF0;
  }
  .product-desc{
    background: #fff;
    margin: 32px;
    padding: 32px;
    border: 1px solid #DDDEE1;
    border-radius: 10px;
    text-align: center;
  }
  .product-desc img{
    display: block;
    width: 50%;
    margin:  32px auto;
    padding: 32px;
    border-bottom: 1px solid #DDDEE1;
  }
</style>
