<template>
	<no-ssr>
		<div class="cart-container">
			<div
				class="cart-empty"
				v-if="carts.length <= 0">
				It`s empty on your cart~
			</div>
			<div
				v-else
				v-for="cart in carts"
				:key="cart.productId"
				v-on:click="$router.push({ path: `/details?productId=${cart.productId}` })"
				class="cart-card-con">
				<cartCard
					:cartProd="cart">
				</cartCard>
			</div>
			<div class="cart-counter-con">
				<div class="cart-counter">
					<div class="cart-checkall">
						<!-- <el-checkbox
							@change="checkAll"
							:checked="checkedAll">
						</el-checkbox>
						<div class="select-all-text">all</div> -->
					</div>
	
					<div class="price-counter">
						<div class="cart-subtotal">Subtotal:</div>
						<div class="cart-price-counter">$ {{subtotal}}</div>
						<div @click="goToPurchase" class="cart-checkout-btn">
							CHECKOUT ( {{checkedProducts.length}} )
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
				localCartList: state => state.cart.localCartList,
				subtotal: state => state.cart.subtotal,
				checkedProducts: state => state.cart.checkedProducts
			})
		},
		data () {
			return {
				cartProdList: [],
				checkedCount: 0,
				checkedAll: false
			}
		},
		async created () {
			await this.$store.dispatch('cart/setCarts')
		},
		methods: {
			checkAll () {
				this.checkedAll = !this.checkedAll
			},
			goToPurchase () {
				if (this.checkedProducts.length) this.$router.push({ path: '/purchase' })
			}
		}
	}
</script>

<style>
	.cart-container {
		padding-top: 48px;
		background-color: #efefef;
    height: 667px;
	}

	.cart-empty {
		width: 100%;
		text-align: center;
		padding-top: 20%;
		color: #808080;
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