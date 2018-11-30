<template>
	<div>
		<el-dialog
			class="add-succeed-dialog"
			:visible.sync="dialogVisible"
			title="Adding to cart succeed!"
			center
			width="80%">
			<div class="as-body">
				<div><span>{{cartCount}}</span> {{ cartCount > 1 ? 'items' : 'item' }} in cart.</div>
				<div>Subtotal: <span>USD ${{subtotalOnCart}}</span></div>
				<div class="as-checkout" v-on:click="goToPurchase">Proceed to Checkout</div>
				<div class="as-back" v-on:click="dialogVisible = false">Return to Shopping</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	export default {
		data () {
			return {
				dialogVisible: true
			}
		},
		computed: {
			...mapState({
				cartCount: state => {
					if (state.isAuthenticated) return state.cart.cartList.length
					return state.cart.localCartList.length
				},
				carts: state => state.cart.carts,
			}),
			...mapGetters({
				subtotalOnCart: 'cart/subtotalOnCart'
			})
		},
		methods: {
			async goToPurchase () {
				await this.$store.dispatch('cart/setCarts')
				this.$store.commit('cart/SET_CHECKED_PRODUCTS', this.carts.map(ele => ele.productId))
    		this.$store.dispatch('cart/setSubtotal')
				this.$router.push({ path: '/purchase' })
			}
		}
	}
</script>

<style>

	.add-succeed-dialog {
		margin-top: 25%;
	}

	.add-succeed-dialog .el-dialog {
		border-radius: 10px;
	}

	.add-succeed-dialog .el-dialog__body {
		padding: 0 0 25px 0;
	}

	.as-body {
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.as-body div {
		padding: 3px 0;
	}

	.as-body span {
		color: #dd127b;
		font-weight: bold;
	}

	.as-checkout {
		color: white;
		background-color: #dd127b;
		border: 1px solid #dd127b;
		border-radius: 20px;
		width: 60%;
		padding: 10px;
	}

	.as-back {
		color: #dd127b;
		border: 2px solid #dd127b;
		border-radius: 20px;
		width: 60%;
		padding: 10px;
		margin-top: 5px;
	}

</style>