<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<img
				:src="product.mainImg"
				class="produc-card-image"
				@click="showDetail(product._id)">
			<div class="prod-detail">
				<span
					class="prod-name"
					@click="showDetail(product._id)">
					{{product.name}}
				</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{price}}
					</div>
					<div class="prod-fav-cart">
						<!-- <div>
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
						</div> -->
						<div
							class="card-inquiry-btn"
							v-on:click="getInquiry(product.name)">
							<span>Inquiry</span>
						</div>
					</div>
				</div>
			</div>
		</el-card>

		<addedDialog v-if="dialogVisible"></addedDialog>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import _ from 'lodash'

	import favorite from '@/apis/favorite'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	import addedDialog from '@/components/addedDialog'

	export default {
		props: [
			'product'
		],
		components: {
			addedDialog
		},
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				carts: state => {
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
				dialogVisible: false,
				cartImg: '',
				favImg: '',
				price: ''
			}
		},
		created () {
			this.getCartFavImg()
			this.formatPrice()
		},
		methods: {
			formatPrice () {
				const allPrice = _.orderBy([...this.product.customizePrice].map(ele => ele.price))
				const minPrice = allPrice[0] || 0
				this.price = minPrice.toFixed(2)
			},
			getCartFavImg () {
				const cartIdList = this.carts.map(ele => ele.productId)
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
				const { price, key } = this.product.customizePrice[0]
				const { priceId, maxWeight } = this.product
				const cartInfo = { productId, price, key, count: 1, priceId, maxWeight }

				if (this.isAuthenticated) {
					this.$store.dispatch('list/createCart', cartInfo)
				} else {
					LS.createCart(cartInfo)
					this.$store.dispatch('cart/setLocalCartList')
					this.getCartFavImg()
				}
				this.dialogVisible = !this.dialogVisible
			},
			addToFav (productId) {
				if (this.isAuthenticated) {
					this.$store.dispatch('list/createFav', productId)
				} else {
					LS.createFavorite(productId)
					this.$store.dispatch('cart/setLocalFavList')
					this.getCartFavImg()
				}
			},
			getInquiry (title) {
        const sendPage = {
					name: this.$route.name,
					path: this.$route.fullPath,
					additional: title
				}
        this.$store.commit('inquiry/SET_SEND_PAGE', sendPage)
        this.$router.push({ path: '/inquiry' })
      }
		}
	}
</script>

<style>
  .button {
    padding: 0;
    float: right;
  }

  .produc-card-image {
    width: 100%;
		height: 196px;
    display: block;
  }

	.prod-detail {
		padding: 6px;
		font-size: 13px;
		height: 53px;
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

	.card-inquiry-btn {
		background-color: #dd127b;
		color: white;
		border-radius: 3px;
		padding: 4px 10px;
	}
</style>