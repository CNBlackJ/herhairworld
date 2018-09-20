<template>
	<no-ssr>
		<div class="cart-container">
			<div
				v-for="cart in carts"
				:key="cart._id"
				class="cart-card-con">
				<cartCard
					:cartProd="cart">
				</cartCard>
			</div>
			<div class="cart-counter-con">
				<div class="cart-counter">
					<div class="cart-checkall">
						<el-checkbox
							@change="checkAll"
							:checked="isCheckedAll">
						</el-checkbox>
						<div class="select-all-text">all</div>
					</div>
	
					<div class="price-counter">
						<div class="cart-subtotal">Subtotal:</div>
						<div class="cart-price-counter">$ {{$store.state.cart.subtotal}}</div>
						<div @click="goToPurchase" class="cart-checkout-btn">
							CHECKOUT ( {{$store.state.cart.checkedProducts.length}} )
						</div>
					</div>
				</div>
			</div>
		</div>
	</no-ssr>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import product from '@/apis/product'

	import cartCard from '@/components/cartCard'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			cartCard
		},
		computed: {
			...mapGetters(['isAuthenticated']),
			...mapState({
				isCheckedAll: state => state.cart.isCheckedAll,
				carts: state => state.cart.carts,
				localCartList: state => state.cart.localCartList
			})
		},
		data () {
			return {
				cartProdList: [],
				checkedCount: 0
			}
		},
		created () {
			// this.$store.dispatch('setCartList').then(() => {
			// 	this.$store.dispatch('setCartProdsDetail')
			// 	this.$store.dispatch('setCartTotalPrice')
			// })
			this.$store.dispatch('cart/setCarts')
		},
		methods: {
			checkAll () {
				console.log('check all')
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