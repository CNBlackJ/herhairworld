<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<img
				src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/product_img_1.jpg"
				class="image"
				@click="showDetail(prod._id)">
			<div class="prod-detail">
				<span
					class="prod-name"
					@click="showDetail(prod._id)">
					{{prod.name}}
				</span>
				<div class="prod-bottom">
					<div class="price">
						$ {{prod.price.toFixed(2)}}
					</div>
					<div class="prod-fav-cart">
						<div>
							<img
								@click="addToFav(prod._id)"
								class="prod-fav-icon"
								:src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + ($store.state.favoriteList.indexOf(prod._id) > -1 ? 'favorite.png' : 'unfavorite.png')">
						</div>
						<div>
							<img
								@click="addToCart(prod._id)"
								class="prod-fav-icon"
								:src="'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/' + ($store.state.cartList.map(e => e.prodId).indexOf(prod._id) > -1 ? 'cart.png' : 'uncart.png')">
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import favorite from '@/apis/favorite'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'prod'
		],
		data () {
			return {
				desc: ''
			}
		},
		created () {
			this.$store.dispatch('setFavoriteList')
			this.$store.dispatch('setCartList')
		},
		methods: {
			showDetail (id) {
				this.$router.push({ path: `/details?_id=${id}` })
			},
			addToCart (productId) {
				if (this.$store.state.isLogin) {
					const cartInfo = { productId, count: 1 }
					cart.create({ cart: cartInfo }).then((resp) => {
						if (!resp.error_code) {
							console.log('create cart success')
							this.$store.dispatch('setCartList')
						} else {
							console.log(resp.error_msg)
						}
					})
				} else {
					LS.createCart({ prodId: productId, count: 1 })
					this.$store.dispatch('setCartList')
				}
			},
			addToFav (id) {
				if (this.$store.state.isLogin) {
					const favoriteInfo = {
						productId: id,
						userId: this.$store.state.loginUser._id
					}
					favorite.create({ favorite: favoriteInfo }).then((resp) => {
						if (!resp.error_code) {
							console.log('create fav success')
						} else {
							console.log(resp.error_msg)
						}
					})
				} else {
					// save into localstorage
					LS.createFavorite(id)
				}
				this.$store.dispatch('setFavoriteList')
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