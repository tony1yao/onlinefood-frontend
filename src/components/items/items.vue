<template>
    <div class="items">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in items" :key="index" class="menu-item"
                :class="{'current': currentIndex === index}" @click="selectMenu(index,$event) ">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="item-wrapper" ref="itemWrapper">
            <ul>
                <li v-for="(item,index) in items" :key="index" class="item-list item-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="item-food border-1px">
                            <div class="icon">
                                <img height="57" width="57" :src="food.icon" alt="icon of the item">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">{{food.sellCount}} sold,</span><span>Good ratings:{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="currentprice">${{food.price}}</span>
                                    <span v-show="food.oldPrice" class="oldprice">{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontroller-wrapper">
                                    <cartcontroller :item = food></cartcontroller>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <cart :delivery-fee=seller.deliveryPrice :min-fee=seller.minPrice></cart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cart from 'components/cart/cart';
import cartcontroller from 'components/cartcontroller/cartcontroller';

const ERR_OK = 0;
export default {
    data() {
        return {
            items: [],
            heightList: [],
            scrollY: 0
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.heightList.length; i++) {
                let height1 = this.heightList[i];
                let height2 = this.heightList[i + 1];
                if ((!height2) || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        }
    },
    created() {
        this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.items = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            }
        );

        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let itemList = this.$refs.itemWrapper.getElementsByClassName("item-list-hook");
            let element = itemList[index];
            this.itemScroll.scrollToElement(element, 300);
        },
        _initScroll() {
            this.nemuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });

            this.itemScroll = new BScroll(this.$refs.itemWrapper, {
                probeType: 3,
                click: true
            });

            this.itemScroll.on("scroll", (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let itemList = this.$refs.itemWrapper.getElementsByClassName("item-list-hook");
            let height = 0;
            this.heightList.push(height);
            for (let i = 0; i < itemList.length; i++) {
                let item = itemList[i];
                height += item.clientHeight;
                this.heightList.push(height);
            }
        }
    },
    components: {
        cart,
        cartcontroller
    }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
    .items
        display flex
        position absolute
        top 174px
        width 100%
        bottom 46px
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background-color #f3f5f7
            .menu-item
                display table
                height 54px
                width 56px
                line-height 14px
                padding 0 12px
                &.current
                    position relative
                    margin-top -1px
                    z-index 10
                    background #fff
                    font-weight 700
                    .text
                        border-none()
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px
                    background-repeat no-repeat
                    vertical-align top
                    &.decrease
                        bg-image("decrease_3")
                    &.discount
                        bg-image("discount_3")
                    &.guarantee
                        bg-image("guarantee_3")
                    &.invoice
                        bg-image("invoice_3")
                    &.special
                        bg-image("special_3")
                .text
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7,17,27,0.1))
                    font-size 10px
        .item-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147,153,159)
                background #f3f5f7
            .item-food
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 14px
                        color rgb(7,17,27)
                    .desc, .extra
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                    .desc
                        margin-bottom 8px
                        line-height 12px
                    .extra
                        .count
                            margin-right 12px
                    .price
                        font-weight 700
                        line-height 24px
                        .currentprice
                            margin-right 8px
                            font-size 14px
                            color rgb(240, 20, 20)
                        .oldprice
                            text-decoration line-through
                            font-size 10px
                            color rgb(147,153,159)
                    .cartcontroller-wrapper
                            position absolute
                            right 0
                            bottom 2px

</style>
