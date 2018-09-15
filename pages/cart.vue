<template>
	<div class="cart-container">
		<div
			v-for="cartProd in $store.state.cartProdsDetail"
			:key="cartProd._id"
			class="cart-card-con">
			<cartCard
				:cartProd="cartProd">
			</cartCard>
		</div>
		<div class="cart-counter-con">
			<div class="cart-counter">
				<div class="cart-checkall">
					<el-checkbox @change="checkAll" v-model="isCheckedAll"></el-checkbox>
					<div class="select-all-text">all</div>
				</div>

				<div class="price-counter">
					<div class="cart-subtotal">Subtotal:</div>
					<div class="cart-price-counter">$ {{$store.state.cartTotalPrice.toFixed(2)}}</div>
					<div
						@click="goToPurchase"
						class="cart-checkout-btn">
						CHECKOUT ( {{$store.state.cartCheckedProds.length}} )
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import product from '@/apis/product'

	import cartCard from '@/components/cartCard'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			cartCard
		},
		data () {
			return {
				cartProdList: [],
				isCheckedAll: false
			}
		},
		created () {
			this.$store.dispatch('setCartList').then(() => {
				this.$store.dispatch('setCartProdsDetail')
				this.$store.dispatch('setCartTotalPrice')
			})
		},
		methods: {
			checkAll () {
				this.$store.dispatch('checkAllCartProd', { isCheckedAll: this.isCheckedAll })
				this.$store.dispatch('setCartProdsDetail')
				this.$store.dispatch('setCartTotalPrice')
			},
			goToPurchase () {
				this.$router.push({ path: '/purchase' })
			}
		}
	}
</script>

<style>
	.cart-container {
		padding-top: 50px;
		background-color: #efefef;
    height: 667px;
	}

	.cart-card-con {
		padding: 5px 10px;
	}

	.cart-counter-con {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: white;
	}

	.cart-counter {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: 20px;
	}

	.cart-checkall {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.select-all-text {
		padding: 0 10px
	}

	.price-counter {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.cart-subtotal {
		font-size: 10px;
		padding-right: 10px;
	}

	.cart-price-counter {
		color: #dd127b;
		padding-right: 10px;
	}

	.cart-checkout-btn {
		padding: 15px;
		color: white;
		font-size: 14px;
		background-color: #dd127b;
	}
</style>