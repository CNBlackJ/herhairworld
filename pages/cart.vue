<template>
	<div class="cart-container">
		<div
			v-for="cartProd in cartProdList"
			:key="cartProd._id"
			class="cart-card-con">
			<cartCard :cartProd="cartProd"></cartCard>
		</div>
		<div class="cart-counter-con">
			<div class="cart-counter">
				<div class="cart-checkall">
					<input type="checkbox">
					<div class="select-all-text">all</div>
				</div>

				<div class="price-counter">
					<div class="cart-subtotal">Subtotal:</div>
					<div class="cart-price-counter">$ 0</div>
					<div class="cart-checkout-btn">
						CHECKOUT ( 0 )
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
				cartProdList: []
			}
		},
		created () {
			this.$store.dispatch('setCartList')
			const cartList = this.$store.state.cartList
			const productIds = cartList.map(ele => ele.prodId)
			product.getByIds({ productIds }).then((resp) => {
				if (!resp.error_code) { 
					this.cartProdList = resp.data.map(ele => {
						const existCart = cartList.find(e => e.prodId === ele._id)
						ele.count = existCart ? existCart.count : 1
						return ele
					})
				}
				else { console.log(resp.error_msg) }
			})
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