<template>
	<div class="cart-card-container">
		<el-row>
			<el-col :xs="2">
				<div class="cc-checkbox-con">
					<el-checkbox @change="checkCartProd" v-model="cartProd.isChecked"></el-checkbox>
				</div>
			</el-col>
			<el-col :xs="6">
				<div class="cart-card-img-con">
					<img class="cart-card-img" :src="cartProd.mainImg">
				</div>
			</el-col>
			<el-col :xs="16" style="padding-left: 10px;">
				<div class="cc-rigth">
					<div class="cc-name">
						{{cartProd.name}}
					</div>
					<div class="cc-detail">
						<div class="cc-parameters">
							10inch / natural color / 1Pcs
						</div>
					</div>
					<div class="cc-price">
						${{cartProd.price.toFixed(2)}}
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
								@click="removeFromCart(cartProd._id)"></i>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import cart from '@/apis/cart'
	import LS from '@/apis/localStorage'

	export default {
		props: [
			'cartProd'
		],
		data () {
			return {
				isChecked: this.$store.state.cartCheckedProds.indexOf(this.cartProd._id) > -1,
				counter: this.$store.state.cartList.find(e => e.prodId === this.cartProd._id).count
			}
		},
    methods: {
      updateCount () {
				if (this.$store.state.isLogin) {
					const cartInfo = { productId: this.cartProd._id, count: this.counter }
					cart.updateByProdId({ cart: cartInfo }).then((resp) => {
						if (!resp.error_code) {
							console.log('success to add to cart')
						} else {
							console.log(resp.error_msg)
						}
					})
				} else {
					LS.addCartCount({ prodId: this.cartProd._id, count: this.counter })
				}
				this.$store.dispatch('setCartList')
				if (_.find(this.$store.state.cartCheckedProds, e => this.cartProd._id)) {
					this.$store.dispatch('setCartTotalPrice')
				}
			},
			removeFromCart (prodId) {
				LS.removeFromCart({ prodId })
				this.$store.dispatch('setCartCheckedProds', { checkedProdId: this.cartProd._id })
				this.$store.dispatch('setCartList')
				this.$store.dispatch('setCartProdsDetail')
				this.$store.dispatch('setCartTotalPrice')
			},
			checkCartProd () {
				this.$store.dispatch('setCartCheckedProds', { checkedProdId: this.cartProd._id })
				this.$store.dispatch('setCartTotalPrice')
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