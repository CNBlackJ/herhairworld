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

		<div class="purchase-address">
			<el-card
				body-style="padding:10px;"
				class="purchase-address-con">
				<div slot="header">
					<span class="purchase-card-title">Shipping Address</span>
					<el-button style="float: right; padding: 3px 0" type="text">
						<i class="el-icon-plus"></i>
						Add Address
					</el-button>
				</div>
				<div class="purchase-address-content">
					<div class="purchase-address-icon">
						<i class="el-icon-location-outline"></i>
					</div>
					<div class="purchase-address-info">
						<div class="pa-userinfo">
							<div class="pa-userinfo-text"><strong>Name:</strong> VinliCheung</div>
							<div class="pa-userinfo-text">13631146428</div>
						</div>
						<div class="pa-address">
							<strong>Address:</strong> 10600 North Tantau AvenueCupertino, CA 95014
						</div>
					</div>
				</div>
			</el-card>
		</div>

		<div class="purchase-payment">
			<el-card>
				<div slot="header">
					<span class="purchase-card-title">Payment Methods</span>
				</div>
				<div>
					<el-select
						v-model="payment"
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
					<el-input v-model="couponCode" placeholder="$3 off with coupon code"></el-input>
				</div>
			</el-card>
		</div>

		<div class="purchase-submit">
			<div class="purchase-submit-text">
				Submit
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		layout: 'main',
		data () {
			return {
				couponCode: '',
				payment: '',
				payments: [
					{ id: 1, name: 'Paypal', value: 'paypal' },
					{ id: 2, name: 'AliPay', value: 'alipay' },
					{ id: 3, name: 'ApplePay', value: 'applepay' }
				]
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

	.purchase-address {
		padding-bottom: 10px;
	}

	.purchase-address-con {
		font-size: 13px;
	}

	.purchase-address-con .el-card__header {
		padding: 15px;
	}

	.purchase-card-header {
		padding: 15px;
	}

	.purchase-card-title {
		font-size: 16px;
	}

	.purchase-address-content {
		display: flex;
		flex-direction: row;
	}

	.purchase-address-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24px;
		padding-right: 10px;
	}

	.purchase-address-info {
		display: flex;
		flex-direction: column;
	}

	.pa-userinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
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
	}

	.purchase-submit-text {
		background-color: #dd127b;
		color: white;
		text-align: center;
		padding: 10px 0;
		border-radius: 5px;
	}
</style>