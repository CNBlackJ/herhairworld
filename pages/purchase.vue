<template>
	<div class="purchase-container">
		<div class="purchase-step">
			<el-card>
				<el-steps :active="0" align-center>
					<el-step title="Place Order" icon="el-icon-edit"></el-step>
					<el-step title="Pay" icon="el-icon-tickets"></el-step>
					<el-step title="Completed" icon="el-icon-success"></el-step>
				</el-steps>		
			</el-card>	
		</div>

		<div class="purchase-payment">
			<el-card>
				<div slot="header">
					<span class="purchase-card-title">Payment Methods</span>
				</div>
				<div>
					<el-select
						v-model="orderInfo.payment"
						placeholder="Choose your payment method"
						class="payment-selector">
						<el-option
							v-for="item in payments"
							:key="item.value"
							:label="item.name"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</el-card>
		</div>

		<div class="purchase-coupon">
			<el-card>
				<div slot="header">
					<span class="purchase-card-title">Coupon Code</span>
					<el-button style="float: right; padding: 3px 0" type="text">
						<i class="el-icon-plus"></i>
						Get Coupon
					</el-button>
				</div>
				<div>
					<el-input v-model="orderInfo.couponCode" placeholder="$3 off with coupon code"></el-input>
				</div>
			</el-card>
		</div>

		<div class="purchase-submit">
			<!-- <div
				@click="createOrder"
				class="purchase-submit-text">
				Submit
			</div> -->
			<no-ssr>
				<paypal-checkout
					env="sandbox"
					amount="10000"
					currency="USD"
					locale="fr_FR"
					payment-completed="showCallback"
					:client="paypal"
					:invoice-number="'201705051001'">
				</paypal-checkout>
			</no-ssr>
		</div>
	</div>
</template>

<script>
	import address from '@/apis/address'

	import addressCard from '@/components/addressCard'

	export default {
		layout: 'main',
		components: {
			addressCard
		},
		data () {
			return {
				paypal: {
					sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
					// sanbox: 'access_token$sandbox$77k65bvyyxs3mcs6$cb80b1fc3d3d4f5ffc7574dc662691c9',
          production: '<production client id>'
        },
				payments: [
					{ id: 1, name: 'Paypal', value: 'paypal' },
					{ id: 2, name: 'AliPay', value: 'alipay' },
					{ id: 3, name: 'ApplePay', value: 'applepay' }
				],
				orderInfo: {
					payment: '',
					couponCode: ''
				}
			}
		},
		methods: {
			createOrder () {
				const payload = this.orderInfo
				console.log(`createOrder: ${JSON.stringify(payload)}`)
			},
			showCallback (c) {
				console.log(c)
			}
		}
	}
</script>

<style>
	.purchase-container {
		padding-top: 50px;
	}

	.purchase-step {
		padding-bottom: 10px;
	}

	.purchase-card-title {
		font-size: 16px;
	}

	.pa-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.pa-userinfo-text {
		padding-bottom: 5px;
	}

	.purchase-payment {
		padding-bottom: 5px;
	}

	.payment-selector {
		width: 100%;
	}

	.purchase-submit {
		padding: 10px 5px;
		text-align: center;
	}

	.purchase-submit-text {
		background-color: #dd127b;
		color: white;
		text-align: center;
		padding: 10px 0;
		border-radius: 5px;
	}
</style>