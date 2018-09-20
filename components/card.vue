<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<img
				:src="imgBaseUrl + 'product_img_1.jpg'"
				class="image"
				@click="showDetail(product._id)">
			<div class="prod-detail">
				<span
					class="prod-name"
					@click="showDetail(product._id)">
					{{product.name}}
				</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{product.price.toFixed(2)}}
					</div>
					<div class="prod-fav-cart">
						<div>
							<img
								@click="addToFav(product._id)"
								class="prod-fav-icon"
								:src="favImg">
						</div>
						<div>
							<img
								@click="addToCart(product._id)"
								class="prod-fav-icon"
								:src="cartImg">
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import _ from 'lodash'

	import favorite from '@/apis/favorite'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'product'
		],
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				cartList: state => {
					if (state.isAuthenticated) return state.cart.cartList
					return state.cart.localCartList
				},
				favList: state => {
					if (state.isAuthenticated) return state.cart.favList
					return state.cart.localFavList
				},
				imgBaseUrl: state => state.imgBaseUrl
			})
		},
		data () {
			return {
				cartImg: '',
				favImg: ''
			}
		},
		created () {
			this.getCartFavImg()
		},
		methods: {
			getCartFavImg () {
				const cartIdList = this.cartList.map(ele => ele.prodId)
				const favList = this.favList
				const cartImgName = _.find(cartIdList, ele => ele === this.product._id) ? 'cart.png' : 'uncart.png'
				const favImgName = _.find(favList, ele => ele === this.product._id) ? 'favorite.png' : 'unfavorite.png'
				this.cartImg = this.$store.state.imgBaseUrl + cartImgName
				this.favImg = this.$store.state.imgBaseUrl + favImgName
			},
			showDetail (productId) {
				this.$store.dispatch('details/setProduct', productId)
				this.$router.push({ path: `/details?productId=${productId}` })
			},
			addToCart (productId) {
				if (this.isAuthenticated) {
					this.$store.dispatch('list/createCart', productId)
				} else {
					LS.createCart({ prodId: productId, count: 1 })
					this.$store.dispatch('cart/setLocalCartList')
					this.getCartFavImg()
				}
			},
			addToFav (productId) {
				if (this.isAuthenticated) {
					this.$store.dispatch('list/createFav', productId)
				} else {
					LS.createFavorite(productId)
					this.$store.dispatch('cart/setLocalFavList')
					this.getCartFavImg()
				}
			}
		}
	}
</script>

<style>
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

	.prod-detail {
		padding: 6px;
		font-size: 13px;
	}

	.prod-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.prod-bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 5px;
	}

	.price {
		color: #dd127b;
	}
	
	.prod-fav-cart {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.prod-fav-icon {
		width: 18px;
		height: 18px;
		padding: 0 3px;
	}

</style>