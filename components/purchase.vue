<template>
	<div class="purchase-container">
		<div class="purchase">
			<!-- <div
				class="purchase-btn"
				@click="addToCart">
				add to cart
			</div> -->
			<!-- <div
				class="purchase-btn buynow"
				@click="buyNow">
				buy now
			</div> -->

			<no-ssr>
				<paypal-checkout
					env="sandbox"
					amount="10000"
					currency="USD"
					locale="fr_FR"
					:client="paypal"
					:invoice-number="'201705051001'">
				</paypal-checkout>
			</no-ssr>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				paypal: {
					// sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
					sanbox: 'access_token$sandbox$77k65bvyyxs3mcs6$cb80b1fc3d3d4f5ffc7574dc662691c9',
          production: '<production client id>'
        }
			}
		},
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
</style>