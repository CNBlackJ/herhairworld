<template>
	<div class="purchase-container">
		<div class="purchase-step">
			<el-card shadow="never">
				<el-steps :active="0" align-center>
					<el-step title="Place Order" icon="el-icon-edit"></el-step>
					<el-step title="Pay" icon="el-icon-tickets"></el-step>
					<el-step title="Completed" icon="el-icon-success"></el-step>
				</el-steps>		
			</el-card>	
		</div>

		<div class="purchase-orders">
			<div
				v-for="product in products"
				:key="product.productId">
				<purchaseCard
					:cartProd="product">
				</purchaseCard>
			</div>
		</div>

		<div class="purchase-coupon">
			<el-card shadow="never">
				<div slot="header">
					<span class="purchase-card-title">Coupon Code</span>
				</div>
				<div>
					<el-input v-model="orderInfo.couponCode" placeholder="$3 off with coupon code"></el-input>
				</div>
			</el-card>
		</div>

		<div class="purchase-summary">
			<el-row>
				<el-col :span="5" :offset="13">
					total:
				</el-col>
				<el-col :span="5">
					{{summary.total}}
				</el-col>
				<el-col :span="5" :offset="13">
					price:
				</el-col>
				<el-col :span="5" style="color: #dd127b">
					$ {{summary.price}}
				</el-col>
				<el-col :span="5" :offset="13">
					shipping:
				</el-col>
				<el-col :span="5" style="color: #dd127b">
					$ {{summary.shipping}}
				</el-col>
			</el-row>
		</div>

		<div
			v-if="summary.total > 0"
			class="purchase-submit">
			<no-ssr>
				<paypal-checkout
					env="sandbox"
					:amount="String(amount) + '.00'"
					currency="USD"
					locale="en_US"
					v-on:payment-authorized="payAuth"
					v-on:payment-completed="showCallback"
					v-on:payment-cancelled="cancelPayment"
					:client="paypalConfig"
					:items="items"
					:invoice-number="String(Date.now())">
				</paypal-checkout>
			</no-ssr>
		</div>
		<div
			v-else
			class="go-shop">
			<span class="go-shop-btn">
				<nuxt-link to="/list">
					Go to shopping
				</nuxt-link>
			</span>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'

	import product from '@/apis/product'

	import addressCard from '@/components/addressCard'
	import purchaseCard from '@/components/purchaseCard'

	export default {
		layout: 'mainWithoutFooter',
		components: {
			addressCard,
			purchaseCard
		},
		data () {
			return {
				orderInfo: {
					payment: '',
					couponCode: ''
				},
			}
		},
		computed: {
			...mapState({
				checkedProducts: state => state.cart.checkedProducts,
				carts: state => state.cart.carts,
				buyNowProduct: state => state.details.buyNowProduct,
				products: state => state.purchase.products,
				paypalConfig: state => state.purchase.paypalConfig
			}),
			...mapGetters({
				items: 'purchase/items',
				amount: 'purchase/amount',
				summary: 'purchase/summary'
			})
		},
		async created () {
			this.$store.dispatch('purchase/getPurchaseProducts')
		},
		methods: {
			showCallback (payResp) {
				if (payResp.state === 'approved') {
					console.log('pay success')
				} else {
					console.log(payResp)
				}
			},
			payAuth () {
				console.log('pay auth')
			},
			cancelPayment () {
				console.log('cancel payment')
			}
		}
	}
</script>

<style>
	.purchase-container {
		padding-top: 48px;
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

	.purchase-summary {
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
	}

	.purchase-summary .el-col {
		text-align: right;
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

	.go-shop {
		width: 100%;
		padding: 20px 5px;
		text-align: center;
	}

	.go-shop-btn {
		background-color: #dd127b;
		color: white;
		padding: 5px 10px;
		border-radius: 25px;
	}
</style>