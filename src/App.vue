<template>
  <div>
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">Items</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">Comments</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">Seller</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';

export default {
  name: 'App',
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" scoped>
@import "common/stylus/mixin.styl"

    .tab
      display: flex
      width: 100%
      height: 40px
      line-height : 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)
</style>
