<template>
	<div class="cart-container">
		<div
			v-for="cartProd in cartProdList"
			:key="cartProd._id"
			class="cart-card-con">
			<cartCard :cartProd="cartProd"></cartCard>
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
			const productIds = this.$store.state.cartList
			product.getByIds({ productIds }).then((resp) => {
				if (!resp.error_code) { this.cartProdList = resp.data }
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
</style>