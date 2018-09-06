<template>
	<div class="purchase-container">
		<div class="purchase">
			<div
				class="purchase-btn"
				@click="addToCart">
				add to cart
			</div>
			<div
				class="purchase-btn buynow"
				@click="buyNow">
				buy now
			</div>
		</div>
		<div class="payment">
			<div class="payment-img">
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/checkout-logo-medium.png">
			</div>
			<div class="payment-img">
				<img src="https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/paypal-visa.jpg">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			addToCart () {
				this.$emit('addToCart')
			},
			buyNow () {
				this.$emit('buyNow')
			}
		}
	}
</script>

<style>
	.purchase-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-transform: capitalize;
		padding: 10px;
		width: 100%;
	}

	.purchase {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}

	.purchase-btn {
		color: white;
		padding: 15px 40px;
		background-color: #f0ad4e;
		border: 1px solid #f0ad4e;
		border-radius: 5px;
	}

	.buynow {
		background-color: #dd127b;
	}

	.payment {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}

	.payment-img {
		padding: 10px 0;
	}
</style>