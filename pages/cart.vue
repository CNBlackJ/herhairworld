<template>
	<no-ssr>
		<div class="cart-container">
			<div
				class="cart-empty"
				v-if="cartList.length <= 0">
				<div class="cart-empty-img">
					<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/empty_cart.jpg" alt="">
				</div>
				<div>It's empty on your cart.</div>
				<div
					@click="$router.push({ path: '/list?categoryId=5ba20ed028b4e92568a9c4e9&category=all' })"
					class="cart-empty-btn">
					Continue Shopping
				</div>
			</div>
			<div
				v-else
				v-for="(cart, index) in cartList"
				:key="index"
				class="cart-card-con">
				<cartCard
					:cartProd="cart">
				</cartCard>
			</div>
			<div class="cart-counter-con">
				<div class="cart-counter">
					<div class="cart-checkall">
						<!-- <el-checkbox
							@change="onCheckAll"
							v-model="checkedAll">
						</el-checkbox>
						<div class="select-all-text">all</div> -->
					</div>
	
					<div class="price-counter">
						<div class="cart-subtotal">Subtotal:</div>
						<div class="cart-price-counter">$ {{subtotalOnChecked}}</div>
						<div @click="goToPurchase" class="cart-checkout-btn">
							CHECKOUT ( {{(cartList.filter(item => item.isChecked)).length}} )
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
			...mapGetters({
				subtotalOnChecked: 'cart/subtotalOnChecked',
				checkAll: 'cart/checkAll'
			}),
			...mapState({
				isCheckedAll: state => state.cart.isCheckedAll,
				cartList: state => state.cart.cartList
			})
		},
		data () {
			return {
				checkedAll: false
			}
		},
		async created () {
			await this.$store.dispatch('cart/setCartList')
			this.checkedAll = this.checkAll
		},
		methods: {
			async onCheckAll () {
				await this.$store.dispatch('cart/checkAll', { checkAll: this.checkedAll })
			},
			goToPurchase () {
				if ((this.cartList.filter(item => item.isChecked)).length) {
					this.$router.push({ path: '/purchase' })
				} else {
					this.$message('Please selected to purchase.')
				}
			}
		}
	}
</script>

<style>
	.cart-container {
		padding-top: 44px;
		background-color: #efefef;
    height: 667px;
	}

	.cart-empty {
		width: 100%;
		text-align: center;
		padding-top: 20%;
		color: #808080;
	}

	.cart-empty-img {
		padding: 50px 140px 0 140px
	}

	.cart-empty-img img {
		width: auto;
		max-width: 100%
	}

	.cart-empty-btn {
		color: #dd127b;
		padding: 10px;
		text-decoration: underline;
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