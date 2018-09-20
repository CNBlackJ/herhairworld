<template>
	<div class="cart-card-container">
		<el-row>
			<el-col :xs="2">
				<div class="cc-checkbox-con">
					<el-checkbox :checked="isChecked" @change="checkCartProd(cartProd.productId)"></el-checkbox>
				</div>
			</el-col>
			<el-col :xs="6">
				<div class="cart-card-img-con">
					<img class="cart-card-img" :src="product.mainImg">
				</div>
			</el-col>
			<el-col :xs="16" style="padding-left: 10px;">
				<div class="cc-rigth">
					<div class="cc-name">
						{{product.name}}
					</div>
					<div class="cc-detail">
						<div class="cc-parameters">
							10inch / natural color / 1Pcs
						</div>
					</div>
					<div class="cc-price">
						$ {{product.price.toFixed(2)}}
					</div>
					<div class="cc-counter">
						<div>
							<el-input-number
								v-model="counter"
								@change="updateCount"
								size="mini"
								:min="1" 
								:max="10">
							</el-input-number>
						</div>
						<div>
							<i
								class="el-icon-close"
								@click="removeFromCart(product._id)"></i>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import product from '@/apis/product'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'cartProd'
		],
		data () {
			return {
				isChecked: false,
				counter: 0,
				product: {
					price: 0
				}
			}
		},
		async created () {
			const productId = this.cartProd.productId
			await this.getProduct(productId)
			this.isChecked = _.includes(this.$store.state.cart.checkedProducts, productId)
		},
    methods: {
			async getProduct (productId) {
				this.product = await product.getById(productId)
			},
      updateCount () {
				console.log(this.counter)
			},
			removeFromCart (prodId) {
				if (this.$store.state.isLogin) {
					cart.deleteByProdId({ productId: this.cartProd._id }).then((resp) => {
						if (!resp.error_code) {
							this.$store.dispatch('setCartCheckedProds', { checkedProdId: this.cartProd._id })
							this.$store.dispatch('setCartList').then((res) => {
								this.$store.dispatch('setCartProdsDetail')
								this.$store.dispatch('setCartTotalPrice')
							})
						} else {
							console.log(resp.error_msg)
						}
					})
				} else {
					LS.removeFromCart({ prodId })
					this.$store.dispatch('setCartList')
					this.$store.dispatch('setCartProdsDetail')
					this.$store.dispatch('setCartTotalPrice')
				}
			},
			checkCartProd (productId) {
				this.$store.dispatch('cart/setCheckedProducts', productId)
			}
    }
	}	
</script>

<style>
	.cart-card-container {
		padding: 10px;
		background-color: white;
		border-radius: 15px;
	}

	.cc-checkbox-con {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80px;
	}

	.cart-card-img-con {
		width: 80px;
		height: 80px;
	}

	.cart-card-img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}

	.cc-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.cc-name {
		font-size: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cc-detail {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 5px 0;
	}

	.cc-parameters {
		font-size: 12px;
		color: #808080;
	}

	.cc-price {
		font-size: 15px;
		color: #dd127b;
	}

	.cc-counter {
		padding: 5px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>