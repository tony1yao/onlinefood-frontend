<template>
  <div class="cart">
      <div class="content" @click="toggleList">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight' : totalCount>0}">
                      <i class="icon-shopping_cart" :class="{'highlight' : totalCount>0}"></i>
                  </div>
                  <div class="count" v-show="totalCount>0"> {{totalCount}} </div>
              </div>
              <div class="price" :class="{'highlight' : totalPrice>0}">${{totalPrice}}</div>
              <div class="desc">Plus ${{deliveryFee}} delivery fee</div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">{{payDesc}}</div>
          </div>
          <transition name="showlist">
            <div class="cart-list" v-show="showList">
                <div class="list-header">
                    <h1 class="title">Shopping Cart</h1>
                    <span class="empty">Clear</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="item" v-for="(item,index) in itemSelected" :key="index">
                            <span class="name">{{item.name}}</span>
                            <div class="price">
                                <span>${{item.price*item.count}}</span>
                            </div>
                            <div class="cartcontroller-wrapper">
                                <cartcontroller :item = "item"></cartcontroller>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </transition>
      </div>
  </div>
</template>
<script>
import cartcontroller from 'components/cartcontroller/cartcontroller';
import BScroll from 'better-scroll';

export default {
    props: {
        itemSelected: {
            type: Array,
            default() {
                return [
                    {
                        price: 10,
                        count: 1
                    }
                ];
            }
        },
        deliveryFee: {
            type: Number,
            default: 0
        },
        minFee: {
            type: Number,
            default: 0
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.itemSelected.forEach(item => {
                total += item.price * item.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.itemSelected.forEach(item => {
                count += item.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return "Deliver from $" + this.minFee;
            } else if (this.totalPrice < this.minFee) {
                let diff = this.minFee - this.totalPrice;
                return "$" + diff + " more needed";
            } else {
                return "Check out";
            }
        },
        payClass() {
            if (this.totalPrice < this.minFee) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        showList() {
            if (!this.totalCount) {
                this.isListShown = false;
                return false;
            } else {
                let show = !this.isListShown;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        }
    },
    components: {
        cartcontroller
    },
    data() {
        return {
            isListShown: false
        };
    },
    methods: {
        toggleList() {
            if (this.totalCount) {
                this.isListShown = !this.isListShown;
            }
        }
    }
};
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
    .cart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            font-size 0       //font size is 0 since inline-block may have 间隙 issue.
            color rgba(255,255,255,0.4)
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block    //因为是横向排列，所以用inline block
                    vertical-align top
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%    //圆角的常用技巧
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.highlight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                            &.highlight
                                color #fff
                    .count
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 50%
                        font-size 9px
                        font-weight 700
                        color #fff
                        background rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display inline-block
                    vertical-align top
                    margin-top 12px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    border-right 1px solid rgba(255,255,255,0.1)
                    font-size 16px
                    font-weight 700
                    &.highlight
                        color #ffffff
                .desc
                    display inline-block
                    vertical-align top
                    margin 12px 0 0 12px
                    line-height 24px
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    font-weight 700
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #ffffff
            .cart-list
                position absolute
                top 0
                left 0
                width 100%
                z-index -1
                transform translate3d(0,-100%,0)
                &.showlist-enter-active, &.showlist-leave-active
                    transition all 0.5s
                &.showlist-enter, &.showlist-leave-active
                    transform translate3d(0,0,0)
                .list-header
                    height 40px
                    line-height 40px
                    padding 0 18px
                    background #f3f5f7
                    border-bottom 1px solid rgba(7,17,27,0.1)
                    .title
                        float left
                        font-size 12px
                        font-weight bold
                        color rgb(7,17,27)
                    .empty
                        float right
                        font-size 12px
                        color rgb(0,160,220)
                .list-content
                    max-height 217px
                    padding 0 18px
                    background #ffffff
                    overflow hidden
                    z-index 200
                    .item
                        position relative
                        padding 12px 0
                        box-sizing border-box
                        border-1px(rgba(7,17,27,0.1))
                        .name
                            line-height 24px
                            font-size 14px
                            color rgb(7,17,27)
                        .price
                            position absolute
                            right 90px
                            bottom 12px
                            line-height 24px
                            font-size 14px
                            font-weight 700
                            color rgb(240,20,20)
                        .cartcontroller-wrapper
                            position absolute
                            right 0
                            bottom 16px

</style>
