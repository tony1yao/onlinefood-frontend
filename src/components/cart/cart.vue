<template>
  <div class="cart">
      <div class="content">
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
      </div>
  </div>
</template>
<script>
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
        }
    }
};
</script>
<style lang="stylus">
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
</style>
