<template>
 <div v-show="list.length">
   <div class="list-control">
    <!-- 筛选品牌 -->
     <div class="list-control-filter">
      
       <span>品牌:</span>
       <span v-for="item in brands"
       class="list-control-filter-item"
       :class="{on:item===filterBrand}"
       @click="handleFilterBrand(item)">
         {{item}}
       </span>
     </div>
    <!-- 筛选颜色 -->
     <div class="list-control-filter">
       <span>颜色:</span>
       <span v-for="item in colors"
       class="list-control-filter-item"
       :class="{on:item===filterColor}"
       @click="handleFilterColors(item)">
         {{item}}
       </span>
     </div>
     <!-- 排序 -->
     <div class="list-control-order">
      <span>排序:</span>
      <span class="list-control-order-item"
      :class="{on:order===''}"
      @click="handleOrderDefault"
      >默认</span>
      <span class="list-control-order-item"
      :class="{on:order==='sales'}"
      @click="handleOrderSales">
       销量
       <template v-if="order==='sales'">↓</template>
      </span>
      <span
      class="list-control-order-item"
      :class="{on:order.indexOf('cost')>-1}"
      @click="handleOrderCost">
      价格
      <template v-if="order==='cost-asc'">↑</template>
      <template v-if="order==='cost-desc'">↓</template>
      </span>
     </div>
   </div>

   <Product v-for="item in filterAndOrderedList"
   :info="item" :key="item.id">

   </Product>
  <div v-show="!filterAndOrderedList.length"
  class="product-not-found">
    暂无相关商品
  </div>

 </div>
</template>

<script>
  import Product from '../components/product.vue';
  
  export default {
    components:{
      Product
     
    },
    data(){
      return{
        order:'',
        filterBrand:'',
        filterColor:''
      }
    },
    methods:{
      // 筛选品牌
      handleFilterBrand(brand){
        // 单次点击选中,再次点击取消选中
        if(this.filterBrand===brand){
          this.filterBrand='';
        }else{
          this.filterBrand=brand;
        }
      },
      // 筛选颜色
      handleFilterColors(color){
        if(this.filterColor===color){
          this.filterColor='';
        }else{
          this.filterColor=color;
        }
      },
      // 默认排序
      handleOrderDefault(){
        this.order='';
      },
      // 销量排序
      handleOrderSales(){
        this.order='sales';
      },
      // 价格排序
      handleOrderCost(){
        if(this.order==='cost-desc'){
          this.order='cost-asc';
        }else{
          this.order='cost-desc';
        }
      }
    },
    computed:{
      list(){
        return this.$store.state.productList;
      },
      brands(){
        return this.$store.getters.brands;
      },
      colors(){
        return this.$store.getters.colors;
      },
      filterAndOrderedList(){
        let list=[...this.list];
        // 按品牌过滤
        if(this.filterBrand!==''){
          list=list.filter(item=>item.brand===this.filterBrand);
        }
        // 按颜色过滤
        if(this.filterColor!==''){
          list=list.filter(item=>item.color===this.filterColor);
        }
        if(this.order!==''){
           // 按销量从大到小排序
          if(this.order==='sales'){
            list=list.sort((a,b)=>b.sales-a.sales);
          }else if(this.order==='cost-desc'){
            // 按价格逐渐减少排序
            list=list.sort((a,b)=>b.cost-a.cost);
          }else if(this.order==='cost-asc'){
            // 按价格逐渐增大排序
            list=list.sort((a,b)=>a.cost-b.cost);
          }
        }
        return list;
      }
    },
    mounted() {
      this.$store.dispatch('getProductList');
    }
  }
</script>

<style scoped>
  .product-not-found{
    text-align: center;
    padding: 32px;
  }
  .list-control{
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .list-control-filter{
    margin-bottom: 16px;
  }
  .list-control-filter-item,
  .list-control-order-item{
    cursor: pointer;
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
  }
  .list-control-filter-item.on,
  .list-control-order-item.on{
    background: #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
</style>
