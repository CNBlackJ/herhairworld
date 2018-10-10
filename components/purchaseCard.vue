<template>
	<div class="cart-card-container">
		<el-row>
			<el-col :xs="2">
				<div class="cc-checkbox-con">
					<el-checkbox disabled :checked="true"></el-checkbox>
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
							{{length}} inch / {{product.material}}
						</div>
					</div>
					<div class="cc-price">
						$ {{price}}
					</div>
					<div class="cc-counter">
						<div class="cc-count">
							count: {{count}}
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import product from '@/apis/product'
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'cartProd'
		],
		computed: {
			...mapGetters(['isAuthenticated'])
		},	
		data () {
			return {
				isChecked: false,
				price: 0,
				count: 1,
				length: 0,
				product: {
					mainImg: ''
				}
			}
		},
		async created () {
			const productId = this.cartProd.productId
			await this.getProduct(productId)
		},
    methods: {
			async getProduct (productId) {
				this.product = await product.getById(productId)
				this.price = Number(this.cartProd.price).toFixed(2)
				this.count = this.cartProd.count
				this.length = this.cartProd.length
			},
      async updateCount (productId) {
				if (this.isAuthenticated) {
					const cartInfo = { productId }
					await cart.updateByProdId({ cart: cartInfo })
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

	.cc-count {
		font-size: 14px;
		color: #808080;
	}
</style>